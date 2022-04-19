import weapons from './Weapon'
import armor from './Armor'
import Item from './Item';
import tradeGoods from './TradeGood';
import questItems from './QuestItem';

var hearthstone = new Item("Hearthstone", false, 1);

var items = {
    weapons,
    armor,
    tradeGoods,
    questItems,
    hearthstone
}

export default items;