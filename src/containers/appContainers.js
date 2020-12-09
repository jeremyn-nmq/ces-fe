import React from 'react';
import { connect } from 'react-redux'

const mapStateToProps = state => ({
    appName: state.appName
})

export default connect(mapStateToProps)(app)

function app(props) {
    const { appName } = props;
    return (
        <div>
            {appName}
        </div>
    );
}