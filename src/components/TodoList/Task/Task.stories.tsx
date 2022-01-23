import {ReduxStoreProviderDecorator} from "../../../store/storeWithStorybook";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Task} from "./Task";
import React from "react";

export default {
    title: 'Elements/Task',
    component: Task,
    decorators: [
        ReduxStoreProviderDecorator
    ]
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const Primary = Template.bind({ });

Primary.args = {
    id: '01',
    todolistId: 'todolistID1',

};
Primary.args = {
    id: '02',
    todolistId: 'todolistID2',

};