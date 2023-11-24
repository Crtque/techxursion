<?php

namespace MyApp;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Chat implements MessageComponentInterface {
    protected $clients;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn) {
        // Store the new connection to send messages to later
        $this->clients->attach($conn);

        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $numRecv = count($this->clients) - 1;
        echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
            , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');
            $msgArr = json_decode($msg,true);
            $msgText= $msgArr['message'];
            $user_id = $msgArr['user_id'] != 0 ? $msgArr['user_id'] : $from->resourceId ;
            $guzzleClient = new \GuzzleHttp\Client();
            $headers = [
                'Content-Type' => 'application/json'
              ];
              $body = '{
                "msg": "'.$msgText.'",
                "user_id": '.$user_id.',
                "anon": '.($msgArr['user_id'] != 0 ? "false":"true").'
              }';
               print_r($body);
            $guzzleRequest = new \GuzzleHttp\Psr7\Request('POST', 'https://techxursion.ru/api/message',$headers, $body);
            $clients = $this->clients;
            $guzzleRes = $guzzleClient->sendAsync($guzzleRequest)->then(function($response) use ($clients, $from,$user_id,$msgText){
                $body = $response->getBody();
                $bodyArr = json_decode($body,true);
                foreach ($this->clients as $client) {
                    if ($from !== $client) {
                      
                        // The sender is not the receiver, send to each client connected
                        $client->send(json_encode(["from_id"=> $user_id,"message"=>$msgText,"name"=>$bodyArr["name"]],JSON_UNESCAPED_UNICODE));
        
                        
                    }
                }
            })->wait();

    }

    public function onClose(ConnectionInterface $conn) {
        // The connection is closed, remove it, as we can no longer send it messages
        $this->clients->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }
}
