import Vue from 'vue'

import {
    Icon,
    Button,
    Dialog,
    Field,
    Tabbar,
    TabbarItem,
    NavBar,
    CellGroup,
    Divider,
    Collapse, CollapseItem,
    Tab, Tabs,
    Checkbox, CheckboxGroup,
    Pagination,
    DropdownMenu, DropdownItem,
    Tag,
    ActionSheet,
    ImagePreview,
    Step, Steps,
    Loading,
    Cell,
} from 'vant'

Vue.use(Icon).use(Button).use(Dialog).use(Field).use(CellGroup).use(Tabbar).use(TabbarItem)
    .use(NavBar).use(Divider)
    .use(Collapse).use(CollapseItem)
    .use(Tab).use(Tabs)
    .use(Checkbox).use(CheckboxGroup)
    .use(Pagination)
    .use(DropdownItem).use(DropdownMenu)
    .use(Tag)
    .use(ActionSheet)
    .use(ImagePreview)
    .use(Step).use(Steps)
    .use(Loading)
    .use(Cell);