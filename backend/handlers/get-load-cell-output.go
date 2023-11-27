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

func GetLoadCellOutput(w http.ResponseWriter, r *http.Request) {
	log.Println("cmd to response")

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}
	defer ws.Close()

	go func(c *websocket.Conn, killCmd func()) {
		for {
			if _, _, err := c.NextReader(); err != nil {
				c.Close()
				killCmd()
				break
			}
		}
	}(ws, killCmd)

	ws.CloseHandler()

	ws.WriteMessage(1, []byte("Starting...\n"))

	killCmd()

	log.Println("exec ./prog command")
	cmd = exec.Command("./prog")

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
		killCmd()
		log.Println(err)
		return
	}

	ws.WriteMessage(1, []byte("Finished\n"))
}

func killCmd() {
	if cmd != nil {
		if err := cmd.Process.Kill(); err != nil {
			log.Println("failed to kill process: ", err)
		}
		cmd = nil
	}
}
