import {ComponentMeta, ComponentStory} from "@storybook/react";
import {App} from "./App";
import React from "react";
import {ReduxStoreProviderDecorator} from "./store/storeWithStorybook";

export default {
    title: 'Pages/App',
    component: App,
    decorators: [
        ReduxStoreProviderDecorator
    ]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App/>;

export const Primary = Template.bind({});