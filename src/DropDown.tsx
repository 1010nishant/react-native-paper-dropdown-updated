import {
  LayoutChangeEvent,
  FlatList,
  View,
} from "react-native";
import {
  Checkbox,
  Divider,
  Menu,
  TextInput,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import React, {
  forwardRef,
  useEffect,
  useState,
  useCallback,
  Fragment,
  ForwardedRef,
} from "react";

import type {DropDownPropsInterface, ListItem } from './types'

const DropDown = forwardRef<View, DropDownPropsInterface>(
  (props,ref:ForwardedRef<View>) => {
    const activeTheme = useTheme();
    const {
      multiSelect = false,
      visible,
      onDismiss,
      showDropDown,
      value,
      setValue,
      activeColor,
      mode,
      label,
      placeholder,
      inputProps,
      list,
      rippleColor,
      dropDownContainerMaxHeight,
      dropDownContainerHeight,
      theme,
      dropDownStyle,
      dropDownItemStyle,
      dropDownItemSelectedStyle,
      dropDownItemTextStyle,
      dropDownItemSelectedTextStyle,
      accessibilityLabel,
    } = props;
    const [displayValue, setDisplayValue] = useState("");
    const [inputLayout, setInputLayout] = useState({
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    });

    const onLayout = (event: LayoutChangeEvent) => {
      setInputLayout(event.nativeEvent.layout);
    };

    useEffect(() => {
      if (multiSelect) {
        const _labels = list
          .filter((_) => value.indexOf(_.value) !== -1)
          .map((_) => _.label)
          .join(", ");
        setDisplayValue(_labels);
      } else {
        const _label = list.find((_) => _.value === value)?.label;
        if (_label) {
          setDisplayValue(_label);
        }
      }
    }, [list, value]);

    const isActive = useCallback(
      (currentValue: any) => {
        if (multiSelect) {
          return value.indexOf(currentValue) !== -1;
        } else {
          return value === currentValue;
        }
      },
      [value]
    );

    const setActive = useCallback(
      (currentValue: any) => {
        if (multiSelect) {
          const valueIndex = value.indexOf(currentValue);
          const values = value.split(",");
          if (valueIndex === -1) {
            setValue([...values, currentValue].join(","));
          } else {
            setValue(
              [...values].filter((value) => value !== currentValue).join(",")
            );
          }
        } else {
          setValue(currentValue);
        }
      },
      [value]
    );

    const renderItem = useCallback(
      ({ item }: { item: ListItem }) => (
        <Fragment key={item.value}>
          <TouchableRipple
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => {
              setActive(item.value);
              if (onDismiss) {
                onDismiss();
              }
            }}
          >
            <Fragment>
              <Menu.Item
                titleStyle={{
                  color: isActive(item.value)
                        ? activeColor || (theme || activeTheme).colors.primary
                        : (theme || activeTheme).colors.onSurface,
                  ...(isActive(item.value)
                    ? dropDownItemSelectedTextStyle
                    : dropDownItemTextStyle),
                }}
                title={item.custom || item.label}
                style={{
                  flex: 1,
                  maxWidth: inputLayout?.width,
                  ...(isActive(item.value)
                    ? dropDownItemSelectedStyle
                    : dropDownItemStyle),
                }}
              />
              {multiSelect && (
                <Checkbox.Android
                  theme={{
                    colors: { accent: activeTheme?.colors.primary },
                  }}
                  status={isActive(item.value) ? "checked" : "unchecked"}
                  onPress={() => setActive(item.value)}
                />
              )}
            </Fragment>
          </TouchableRipple>
          <Divider />
        </Fragment>
      ),
      []
    );

    return (
      <Menu
        visible={visible}
        onDismiss={onDismiss}
        theme={theme}
        anchor={
          <TouchableRipple
            ref={ref}
            onPress={showDropDown}
            onLayout={onLayout}
            rippleColor={rippleColor}
            accessibilityLabel={accessibilityLabel}
          >
            <View pointerEvents={"none"}>
              <TextInput
                value={displayValue}
                mode={mode}
                label={label}
                placeholder={placeholder}
                pointerEvents={"none"}
                theme={theme}
                right={
                  <TextInput.Icon icon={visible ? "menu-up" : "menu-down"} />
                }
                {...inputProps}
              />
            </View>
          </TouchableRipple>
        }
        style={{
          maxWidth: inputLayout?.width,
          width: inputLayout?.width,
          marginTop: inputLayout?.height,
          ...dropDownStyle,
        }}
      >
        <FlatList
          bounces={false}
          style={{
            ...(dropDownContainerHeight
              ? {
                  height: dropDownContainerHeight,
                }
              : {
                  maxHeight: dropDownContainerMaxHeight || 200,
                }),
          }}
          data={list}
          keyExtractor={(item) => item.value.toString()}
          renderItem={renderItem}

        />
      </Menu>
    );
  }
);

export default DropDown;
