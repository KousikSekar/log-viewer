package main

import (
	"bufio"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gorilla/mux"
)

type logStructure struct {
	CorrelationEngine  lines
	CaseMappingService lines
	CrmService         lines
	DecisionEngine     lines
	DeviceShadow       lines
	Healthchecker      lines
	WellnessManagement lines
	AlertCollector     lines
	AlertHandler       lines
	WellnessPolicy     lines
}
type logs []lines

type lines []string

var LogFolderPath = `/var/log/rave/`

var CORS_ENABLED_IP = `http://10.174.10.11:8877`

func readFile(w http.ResponseWriter, r *http.Request, fileName string) lines {
	var fileTextLines lines
	if _, err := os.Stat(LogFolderPath + fileName); err == nil {
		fullFilePath := LogFolderPath + fileName
		readFile, _ := os.Open(fullFilePath)
		fileScanner := bufio.NewScanner(readFile)
		fileScanner.Split(bufio.ScanLines)

		for fileScanner.Scan() {
			if strings.Contains(fileScanner.Text(), "kafkavalue") {
				continue
			}
			fileTextLines = append(fileTextLines, fileScanner.Text())
		}
		readFile.Close()
		return fileTextLines
	} else {
		return fileTextLines
	}

}

func readLogsByPath(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", CORS_ENABLED_IP)
	w.Header().Set("Content-Type", "application/json")
	result := &logStructure{}
	urlPath := strings.TrimPrefix(r.URL.Path, "/logs/")

	switch urlPath {
	case "healthchecker":
		readLines := readFile(w, r, "healthchecker.log")
		result.Healthchecker = readLines
	case "alertcollector":
		readLines := readFile(w, r, "alertCollector.log")
		result.AlertCollector = readLines
	case "casemappingservice":
		readLines := readFile(w, r, "caseMappingService.log")
		result.CaseMappingService = readLines
	case "correlationengine":
		readLines := readFile(w, r, "correlationEngine.log")
		result.CorrelationEngine = readLines
	case "crmservice":
		readLines := readFile(w, r, "crmService.log")
		result.CrmService = readLines
	case "deviceshadow":
		readLines := readFile(w, r, "deviceShadow.log")
		result.DeviceShadow = readLines
	case "decisionengine":
		readLines := readFile(w, r, "decisionEngine.log")
		result.DecisionEngine = readLines
	case "wellnessmanagement":
		readLines := readFile(w, r, "wellnessManagement.log")
		result.WellnessManagement = readLines
	case "wellnesspolicy":
		readLines := readFile(w, r, "wellnessPolicy.log")
		result.WellnessPolicy = readLines
	case "alerthandler":
		readLines := readFile(w, r, "alertHandler.log")
		result.AlertHandler = readLines
	}

	jsonResult, _ := json.Marshal(result)
	w.Write(jsonResult)
}

func handleRequest() {
	router := mux.NewRouter()
	router.HandleFunc("/logs/{[\\w]+}", readLogsByPath).Methods("GET", "OPTIONS")
	log.Fatal(http.ListenAndServe(":8787", router))
}

func main() {
	handleRequest()
}
