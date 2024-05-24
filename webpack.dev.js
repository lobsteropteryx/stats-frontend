import merge from "webpack-merge";
import common from "./webpack.common";

export const config = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map'
});