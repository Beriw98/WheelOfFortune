<?php


namespace App\Service;


use App\Entity\Room;
use App\Entity\User;
use App\Utils\Struct\PlayerResponseStruct;
use App\Utils\Struct\UserResponseStruct;
use App\Utils\Struct\WordResponseStruct;
use Symfony\Component\Mercure\PublisherInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Security\Core\User\UserInterface;

class PublisherService
{
    const GAME_TOPIC = "gameInfo/";
    const ROOM_TOPIC = "roomInfo/";
    const CHAT = "chat/";

    private $publisher;

    public function __construct(PublisherInterface $publisher)
    {
        $this->publisher = $publisher;
    }


    public function publish($topic, $json)
    {
        $publisher = $this->publisher;
        $publisher(new Update($topic, $json));

    }

    public function updatePeopleInRoom(Room $room)
    {
        $topic = self::ROOM_TOPIC . $room->getId();
        $data['users'] = [];
        foreach ($room->getUsersInRoom() as $user) {
            $data['users'][] = UserResponseStruct::mapFromUser($user);
        }
        $this->publish($topic, json_encode($data));
        return $data;

    }

    public function startGame(Room $room){
        $topic = self::ROOM_TOPIC. $room->getId();
        $data = [
            'word' => WordResponseStruct::mapFromWord($room->getGame()->getWord()),
            'players' => [],
            'maxPoints' => $room->getGame()->getMaxPoints(),
            'turn' => PlayerResponseStruct::mapFromPlayer($room->getGame()->getTurn())];
        foreach ($room->getGame()->getPlayers() as $player){
            $data['players'][] = PlayerResponseStruct::mapFromPlayer($player);
        }
        $this->publish($topic, json_encode($data));
        return $data;
    }

    public function updateWheel(Room $room, $angle)
    {
        $topic = self::GAME_TOPIC . $room->getId();
        $data = ['angle' => $angle];
        $this->publish($topic, json_encode($data));
    }

    public function updateLetter(Room $room, $letter)
    {
        $topic = self::GAME_TOPIC . $room->getId();
        $data = ['letter' => $letter];
        $this->publish($topic, json_encode($data));

    }

    public function isWordGuessed(Room $room, $guessed)
    {
        $topic = self::GAME_TOPIC . $room->getId();
        $data = ['guessed' => $guessed];
        $this->publish($topic, json_encode($data));

    }

    public function updateWord(Room $room, $word)
    {
        $topic = self::GAME_TOPIC . $room->getId();
        $data = ['word' => $word];
        $this->publish($topic, json_encode($data));
    }

    public function updatePoints(Room $room)
    {
        $topic = self::GAME_TOPIC . $room->getId();
        $data['points'] = [];
        foreach ($room->getGame()->getPlayers() as $player) {
            $data['points'][] = PlayerResponseStruct::mapFromPlayer($player);
        }
        $this->publish($topic, json_encode($data));
        return $data;
    }

    public function updateTurn(Room $room)
    {
        $topic = self::GAME_TOPIC. $room->getId();
        $data = ['turn' => PlayerResponseStruct::mapFromPlayer($room->getGame()->getTurn())];
        $this->publish($topic, json_encode($data));
    }

    public function sendMessage(Room $room, UserInterface $sender, $message)
    {
        $topic = self::CHAT. $room->getId();
        $data = ['sender' => $sender->getUsername(), 'message' => $message];
        $this->publish($topic, json_encode($data));
    }


}
