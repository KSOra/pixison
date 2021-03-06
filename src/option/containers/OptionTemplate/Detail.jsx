import React, {Component} from 'react';
import qs from 'qs';
import classNames from 'classnames/bind';

import style from './template.scss';
import {functionsArray} from 'js/functions';
import Container from 'components/Container';
import TemplateInput from 'components/TemplateInput';

const cx = classNames.bind(style);

class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            expression: ''
        };
    }

    componentDidMount() {
        this.updateData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateData(nextProps);
    }

    updateData(props) {
        const {key} = qs.parse(props.location.search.slice(1));
        const item = functionsArray.find(f => f.key === key);

        if (item) {
            this.setState({
                name: item.name,
                expression: `$${key}{}`
            })
        }
    }

    handleChange(expression) {
        this.setState({expression})
    }

    render() {
        const {name, expression} = this.state;

        return (
            <Container title={name} disabled>
                <TemplateInput
                    value={expression}
                    onChange={this.handleChange.bind(this)}
                />
            </Container>
        )
    }
}

export default Detail;
