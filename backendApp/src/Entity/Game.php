<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\Table;

/**
 * @ORM\Entity(repositoryClass="App\Repository\GameRepository")
 * @Table(name="Games")
 */
class Game
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isRunning;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Word")
     */
    private $word;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $maxPoints;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Player", mappedBy="game")
     */
    private $players;

    /**
     * @ORM\Column(type="array")
     */
    private $letters = [];

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $angle;

    public function __construct()
    {
        $this->players = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIsRunning(): ?bool
    {
        return $this->isRunning;
    }

    public function setIsRunning(bool $isRunning): self
    {
        $this->isRunning = $isRunning;

        return $this;
    }

    public function getWord(): ?Word
    {
        return $this->word;
    }

    public function setWord(?Word $word): self
    {
        $this->word = $word;

        return $this;
    }

    public function getMaxPoints(): ?int
    {
        return $this->maxPoints;
    }

    public function setMaxPoints(?int $maxPoints): self
    {
        $this->maxPoints = $maxPoints;

        return $this;
    }

    /**
     * @return Collection|Player[]
     */
    public function getPlayers(): Collection
    {
        return $this->players;
    }

    public function addPlayer(Player $player): self
    {
        if (!$this->players->contains($player)) {
            $this->players[] = $player;
            $player->setGame($this);
        }

        return $this;
    }

    public function removePlayer(Player $player): self
    {
        if ($this->players->contains($player)) {
            $this->players->removeElement($player);
            // set the owning side to null (unless already changed)
            if ($player->getGame() === $this) {
                $player->setGame(null);
            }
        }

        return $this;
    }

    public function getLetters(): ?array
    {
        return $this->letters;
    }

    public function setLetters(array $letters): self
    {
        $this->letters = $letters;

        return $this;
    }

    public function addLetter(string $letter){
        $this->letters[] = $letter;
    }

    public function getTurn(): ?Player
    {
        foreach ($this->getPlayers() as $player) {
            if ($player->getIsNow()){
                return $player;
            }
        }
        return null;
    }

    public function getAngle(): ?int
    {
        return $this->angle;
    }

    public function setAngle(?int $angle): self
    {
        $this->angle = $angle;

        return $this;
    }
}
