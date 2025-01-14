// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import { createCalendarClickedEvent } from '../../analytics/AnalyticsEvents';
import { sendAnalytics } from '../../analytics/functions';
import { translate } from '../../base/i18n/functions';
import Icon from '../../base/icons/components/Icon';
import { IconPlus } from '../../base/icons/svg';
import Tooltip from '../../base/tooltip/components/Tooltip';
import { updateCalendarEvent } from '../actions';

/**
 * The type of the React {@code Component} props of {@link AddMeetingUrlButton}.
 */
type Props = {

    /**
     * The calendar ID associated with the calendar event.
     */
    calendarId: string,

    /**
     * Invoked to add a meeting URL to a calendar event.
     */
    dispatch: Dispatch<any>,

    /**
     * The ID of the calendar event that will have a meeting URL added on click.
     */
    eventId: string,

    /**
     * Invoked to obtain translated strings.
     */
    t: Function
};

/**
 * A React Component for adding a meeting URL to an existing calendar event.
 *
 * @augments Component
 */
class AddMeetingUrlButton extends Component<Props> {
    /**
     * Initializes a new {@code AddMeetingUrlButton} instance.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        // Bind event handler so it is only bound once for every instance.
        this._onClick = this._onClick.bind(this);
        this._onKeyPress = this._onKeyPress.bind(this);
    }

    /**
     * Implements React's {@link Component#render}.
     *
     * @inheritdoc
     */
    render() {
        return (
            <Tooltip content = { this.props.t('calendarSync.addMeetingURL') }>
                <div
                    className = 'button add-button'
                    onClick = { this._onClick }
                    onKeyPress = { this._onKeyPress }
                    role = 'button'>
                    <Icon src = { IconPlus } />
                </div>
            </Tooltip>
        );
    }

    _onClick: () => void;

    /**
     * Dispatches an action to adding a meeting URL to a calendar event.
     *
     * @returns {void}
     */
    _onClick() {
        const { calendarId, dispatch, eventId } = this.props;

        sendAnalytics(createCalendarClickedEvent('add.url'));

        dispatch(updateCalendarEvent(eventId, calendarId));
    }

    _onKeyPress: (Object) => void;

    /**
     * KeyPress handler for accessibility.
     *
     * @param {Object} e - The key event to handle.
     *
     * @returns {void}
     */
    _onKeyPress(e) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            this._onClick();
        }
    }
}

export default translate(connect()(AddMeetingUrlButton));
