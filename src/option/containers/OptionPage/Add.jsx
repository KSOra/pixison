import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import {Button} from 'rsuite';
import qs from "qs";

import style from './page.scss';
import PageForm from "~/components/PageForm";
import Container from 'components/Container';
import {autoSyncToDrive} from "js/sync";

const cx = classNames.bind(style);

const mapDispatchToProps = {
    addPage: (page) => ({
        type: 'ADD_PAGE',
        data: page
    })
};

const mapStateToProps = ({page}) => ({
    urls: page.pages.map(({url}) => url)
});

class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formValue: {
                name: '',
                url: '',
                target: '',
                expressions: []
            }
        }
    }

    submit() {
        const {formValue} = this.state;

        if(this.form.root.check()) {
            this.props.addPage(formValue);
            autoSyncToDrive();
            this.props.history.replace(`/page/detail?${qs.stringify({url: formValue.url})}`);
        }
    }

    render() {
        const {formValue} = this.state;

        return (
            <Container title={'添加页面'} disabled>
                <PageForm
                    ref={ref => (this.form = ref)}
                    mode={'add'}
                    value={formValue}
                    urls={this.props.urls}
                    onChange={formValue => this.setState({formValue})}
                />
                <Button
                    appearance={'primary'}
                    size={'md'}
                    style={{marginTop:'40px'}}
                    onClick={this.submit.bind(this)}
                >创建</Button>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);
