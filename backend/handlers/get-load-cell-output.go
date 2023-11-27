package handlers

import (
	"bufio"
	"io"
	"log"
	"net/http"
	"os/exec"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

var cmd *exec.Cmd

func killCmd(c *exec.Cmd) {
	log.Println("Kill cmd", c)
	if c != nil {
		if err := c.Process.Kill(); err != nil {
			log.Println("Failed to kill process: ", err)
		}
		c = nil
	}
}

func GetLoadCellOutput(w http.ResponseWriter, r *http.Request) {
	log.Println("Starting load cell ws")

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}
	defer ws.Close()

	killCmd(cmd)

	ws.WriteMessage(1, []byte("Starting load cell ws...\n"))

	log.Println("exec ./prog command")
	cmd = exec.Command("./prog")

	go func(c *websocket.Conn, cmd *exec.Cmd) {
		for {
			if _, _, err := c.NextReader(); err != nil {
				c.Close()
				killCmd(cmd)
				break
			}
		}
	}(ws, cmd)

	// execute and get a pipe
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		log.Println(err)
		return
	}
	stderr, err := cmd.StderrPipe()
	if err != nil {
		log.Println(err)
		return
	}

	if err := cmd.Start(); err != nil {
		log.Println(err)
		return
	}

	s := bufio.NewScanner(io.MultiReader(stdout, stderr))
	for s.Scan() {
		log.Println("weight", string(s.Bytes()))
		ws.WriteMessage(1, s.Bytes())
	}

	if err := cmd.Wait(); err != nil {
		killCmd(cmd)
		log.Println(err)
		return
	}

	ws.WriteMessage(1, []byte("Finished load cell ws...\n"))
}
