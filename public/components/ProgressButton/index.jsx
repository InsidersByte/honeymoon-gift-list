/* @flow */

import React from 'react';
import { RaisedButton } from 'material-ui';

type PropsType = {
    saving: boolean,
};

const ProgressButton = ({ saving, ...props }: PropsType) => {
    if (saving) {
        return (
            <RaisedButton
                {...props}
                primary
                label="Saving..."
                type="submit"
                disabled
            />
        );
    }

    return (
        <RaisedButton
            {...props}
            primary
            type="submit"
        />
    );
};

export default ProgressButton;
