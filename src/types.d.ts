
import { ReactNode } from "react";
import { TextStyle, ViewStyle } from "react-native";
import { Props } from "react-native-paper/lib/typescript/components/TextInput/TextInput";
import { InternalTheme } from "react-native-paper/lib/typescript/types";

type Without<T, K> = Pick<T, Exclude<keyof T, K>>;

type TextInputPropsWithoutTheme = Without<Props, "theme">;

export interface ListItem {
    label: string;
    value: string | number;
    custom?: ReactNode;
  }

export interface DropDownPropsInterface {
    visible: boolean;
    multiSelect?: boolean;
    onDismiss: () => void;
    showDropDown: () => void;
    value: any;
    setValue: (_value: any) => void;
    label?: string | undefined;
    placeholder?: string | undefined;
    mode?: "outlined" | "flat" | undefined;
    inputProps?: TextInputPropsWithoutTheme;
    rippleColor?: string | undefined;
    list: ListItem[];
    dropDownContainerMaxHeight?: number;
    dropDownContainerHeight?: number;
    activeColor?: string;
    theme?: InternalTheme;
    dropDownStyle?: ViewStyle;
    dropDownItemSelectedTextStyle?: TextStyle;
    dropDownItemSelectedStyle?: ViewStyle;
    dropDownItemStyle?: ViewStyle;
    dropDownItemTextStyle?: TextStyle;
    accessibilityLabel?: string;
  }