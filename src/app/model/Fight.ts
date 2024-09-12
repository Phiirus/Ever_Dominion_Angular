import { Player } from "./Player";

export interface Fight
{
    attacker: Player;
    defender: Player;
    results: string[];
    playerHealth: number[];
    enemyHealth: number[];
    victory:boolean;
    gold: number;
}