import { Friend } from "./Friend";
import { Gear } from "./Gear";
import { Troop } from "./Troop";

export interface Player
{
    id:number;
    nick: string;
    playerMinDmg: number;
    playerMaxDmg: number;
    playerHealth: number;
    stamina: number;
    gold: number;
    online: string;
    icon: string;
    shield: string;
    hasShield: Boolean;

    activeGears: Gear[];
    storageGears: Gear[];

    activeTroops: Troop[];
    storageTroops: Troop[];

    friends: Friend[];
}