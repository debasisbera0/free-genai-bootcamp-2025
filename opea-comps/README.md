# Installed Docker in Macbook Air
1. Download the docker package from docker.com (suitable for Apple Silicon)
2. installed by dragging docker icon to the applications. 
3. followed the instructions and setup the password
4. To make sure if the Docker is running, ran 'docker --verion' in the terminal followed by 'docker run hello-world' and 'docker compose version'
5. To enable in VS Code, installed it using extension. 

## Running OLLAMA Third Party Service

### Choosing a model 
One can get a model_id that ollama will launch from the [ollama Library] (https://ollama.com/library/)
eg. Ollama Llama3.2 with 3B parameters https://ollama.com/library/llama3.2
Ollama info @ Opea GitHub: https://github.com/opea-project/GenAIComps/tree/main/comps/third_parties/ollama

### Steps to run the Ollama in my macbook air
1. Initially I copied and pasted the compose.yml file from opea github repo: https://github.com/opea-project/GenAIComps/blob/main/comps/third_parties/ollama/deployment/docker_compose/compose.yaml
2. I initiated the desktop docker and used VS Code to run the docker.
3. I made sure container is running by using docker ps command. I also ran docker run hello-world 
4. Then I tried to run the compose file 'docker-compose.yml': docker-compose up -d ; the container for ollama-server was created. But somehow didnt work. 
5. I used chatGPT to modify the code. I added the modified code into te yml file and ran.
6. There was an error - it could not find the llama-3 model. Note that I downloaded the llama-3.1 model from ollama in the past.
7. ChatGPT suggested following to run to make sure it is in the container: opea-comps % docker exec -it ollama-server ollama list. The model was not in the container
8. It suggested to pull the model to container: docker exec -it ollama-server ollama pull llama3
9. Model was pulled and tested with following command: curl -X POST "http://localhost:8008/api/generate" -d '{
  "model": "llama3",
  "prompt": "Hello, how are you?",
  "stream": false
}'
10. it replied: {"model":"llama3","created_at":"2025-03-18T01:51:39.9989155Z","response":"I'm just a language model, I don't have emotions or feelings like humans do. However, I'm functioning properly and ready to assist you with any questions or tasks you may have! It's great to meet you, though! Is there something specific you'd like to chat about or ask me?","done":true,"done_reason":"stop","context":[128006,882,128007,271,9906,11,1268,527,499,30,128009,128006,78191,128007,271,40,2846,1120,264,4221,1646,11,358,1541,956,617,21958,477,16024,1093,12966,656,13,4452,11,358,2846,31301,10489,323,5644,311,7945,499,449,904,4860,477,9256,499,1253,617,0,1102,596,2294,311,3449,499,11,3582,0,2209,1070,2555,3230,499,4265,1093,311,6369,922,477,2610,757,30],"total_duration":210036400972,"load_duration":11995278339,"prompt_eval_count":16,"prompt_eval_duration":4851000000,"eval_count":62,"eval_duration":193147000000}%  
