import React from 'react';
import dispatcher from './../../helpers/dispatcher';
import ObjectAttributes from './../../stores/ObjectAttributes';
import ObjectKeyModal from './ObjectKeyModal';

//global theme
import Theme from './../../themes/getStyle';


//this input appears when adding a new value to an object
export default class extends React.PureComponent {

    render() {
        const {active, theme, rjvId} = this.props;
        console.log(rjvId);
        return active ? (
            <ObjectKeyModal
                rjvId={rjvId}
                theme={theme}
                isValid={this.isValid}
                submit={this.submit}
            />
        ) : null;
    }

    isValid = (input) => {
        const {rjvId} = this.props;
        const request = ObjectAttributes.get(
            rjvId, 'action', 'new-key-request'
        );
        return (
            input != ''
        );
    }

    submit = (input) => {
        const {rjvId} = this.props;
        console.log(rjvId);
        let request = ObjectAttributes.get(
            rjvId, 'action', 'new-key-request'
        );
        request.name = input;
        request.key_name = input;
        request.new_value = {};  //{...request.existing_value};
        //request.new_value[input] = this.props.defaultValue;
        console.log(request);
        dispatcher.dispatch({
            name: 'VARIABLE_ADDED',
            rjvId: rjvId,
            data: request
        });
    }

}
