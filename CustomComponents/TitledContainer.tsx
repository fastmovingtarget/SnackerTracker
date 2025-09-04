//2025-09-04 : added a little padding, title is no longer bold
//2025-08-27 : Border and Title for a container
import {View, Text} from "react-native";
import type { PropsWithChildren } from "react";
import type { TextStyle, ViewStyle } from "react-native";
import { Colours } from "../Constants/Colours";
import Fonts from "../Constants/Fonts";

type TitledContainerProps = {
    style?: ViewStyle,
    ["aria-label"]?:string,
    title?: string,
}

const TitledContainer = ({style, children, 'aria-label' : ariaLabel, title} : PropsWithChildren<TitledContainerProps>) => {
    return (
        <View 
            style={{ 
                ...columnContainerStyles,
                ...style,
            }}
            aria-label={ariaLabel}>
            <View style={titleContainerStyle}>
                <Text style={titleStyle}>{title}</Text>
            </View>
            {children}
        </View>
    );
}

const columnContainerStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colours.Primary,
    color: Colours.Text,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colours.Text,
    padding: 10,
    margin: 5,
} as ViewStyle;
const titleStyle = {
    fontSize: Fonts.sizes.small,
    marginBottom: 5,
    color: Colours.Text,
    margin:0,
    padding:0,
} as TextStyle;
const titleContainerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    position: "absolute",
    left: "3%",
    top: -10,
    backgroundColor: Colours.Primary,
    padding:2
} as ViewStyle;

export default TitledContainer;