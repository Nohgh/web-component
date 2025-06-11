import Component from "./core/component.js";
import Items from "./components/items.js";
import ItemAppender from "./components/itemAppender.js";
import ItemFilter from "./components/itemFilter.js";

export default class App extends Component {
  setup() {
    this.state = {
      isFilter: 0,
      item: [
        {
          seq: 1,
          contents: "item1",
          active: false,
        },
        {
          seq: 2,
          contents: "item2",
          active: true,
        },
      ],
    };
  }

  template() {
    return `
      <header data-component="item-appender"></header>
      <main data-component="items"></main>
      <footer data-component="item-filter"></footer>
    `;
  }

  //자식 컴포넌트를 마운트
  mounted() {
    const { filteredItems, addItem, deleteItem, toggleItem, filterItem } = this;
    const $itemAppender = this.$target.querySelector(
      '[data-component="item-appender"]'
    );
    const $items = this.$target.querySelector('[data-component="items"]');
    const $itemFilter = this.$target.querySelector(
      '[data-component="item-filter"]'
    );

    //하나의 객체에서 사용하는 메소드를 넘겨줄 bind를 사용하여 tihs를 변경
    new ItemAppender($itemAppender, {
      addItem: addItem.bind(this),
    });

    new Items($items, {
      filteredItems,
      deleteItem: deleteItem.bind(this),
      toggleItem: toggleItem.bind(this),
    });

    new ItemFilter($itemFilter, {
      filterItem: filterItem.bind(this),
    });
  }

  //getter 메서드
  get filteredItems() {
    const { isFilter, items } = this.state;
    return items.filter(
      ({ active }) =>
        (isFilter === 1 && active) ||
        (isFilter === 2 && !active) ||
        isFilter === 0
    );
  }

  addItem(contents) {
    const { items } = this.state;
    const seq = Math.max(0, ...items.map((v) => v.seq)) + 1;
    const active = false;
    this.setState({ items: [...items, { seq, contents, active }] });
  }

  deleteItem(seq) {
    const items = [...this.state.items];
    items.splice(
      item.findIndex((v) => v.seq === seq),
      1
    );
    this.setState({ items });
  }

  toggleItem(seq) {
    const itmes = [...this.state.items];
    const index = itmes.findIndex((v) => v.seq === seq);
    items[index].active = !items[index].active;
    this.setState({ items });
  }

  filterItem(isFilter) {
    this.setState({ isFilter });
  }
}

new App();
