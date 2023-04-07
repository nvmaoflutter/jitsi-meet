import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

import Icon from '../../icons/components/Icon';

import AbstractToolboxItem, { IProps } from './AbstractToolboxItem';

/**
 * Native implementation of {@code AbstractToolboxItem}.
 */
export default class ToolboxItem extends AbstractToolboxItem<IProps> {
    /**
     * Renders the {@code Icon} part of this {@code ToolboxItem}.
     *
     * @private
     * @returns {ReactElement}
     */
    _renderIcon() {
        const { styles } = this.props;

        return (
            <Icon
                src = { this.props.icon }
                style = { styles?.iconStyle } />
        );
    }

    /**
     * Renders this {@code ToolboxItem}. Invoked by {@link AbstractToolboxItem}.
     *
     * @override
     * @protected
     * @returns {ReactElement}
     */
    _renderItem() {
        const {
            disabled,
            elementAfter,
            onClick,
            showLabel,
            styles,
            toggled
        } = this.props;

        let children = this._renderIcon();

        // XXX When using a wrapper View, apply the style to it instead of
        // applying it to the TouchableHighlight.

        let style = styles?.style;
        const stypeV2: typeof style = {
            ...style,
            flexDirection:"column"
        };

        const styleLabel: typeof style = {
            ...styles?.labelStyle,
           color:"white",
           fontSize: 10,
           fontWeight:"500",
           textAlign:"center"
          };

      
            // XXX TouchableHighlight requires 1 child. If there's a need to
            // show both the icon and the label, then these two need to be
            // wrapped in a View.
            children = (
                <View style = { stypeV2 }>
                    { children }
                    <Text style = { styleLabel }>
                        { this.label }
                    </Text>
                    { elementAfter }
                </View>
            );

            // XXX As stated earlier, the style was applied to the wrapper View
            // (above).
            style = undefined;
        

        return (
            <TouchableHighlight
                accessibilityLabel = { this.accessibilityLabel }
                accessibilityRole = 'button'
                accessibilityState = {{ 'selected': Boolean(toggled) }}
                disabled = { disabled }
                onPress = { onClick }
                style = { style }
                underlayColor = { styles?.underlayColor } >
                { children }
            </TouchableHighlight>
        );
    }
}
