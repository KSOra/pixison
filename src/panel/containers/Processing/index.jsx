import React, {Component} from 'react';
import {IconButton, Icon, Input} from 'rsuite';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';

import style from './processing.scss';
import service from 'js/service';

const cx = classNames.bind(style);

class Processing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.names[0],
            target: props.targets[0],
            showSelect: '',
            selectOptions: []
        };
    }

    componentWillMount() {
        const {token, history} = this.props;

        if (!token) history.replace('/')
    }

    toggleSelect(value) {
        this.setState({
            showSelect: value
        });
    }

    updateSelectOptions(value) {
        const {names, targets} = this.props;
        let selectOptions;

        if (value === 'name') {
            selectOptions = [...names]
        }
        if (value === 'target') {
            selectOptions = [...targets]
        }
        this.setState({
            selectOptions
        });
        this.toggleSelect(value);
    }

    handleClickOption(value, option) {
        if (value === 'name') {
            this.setState({
                name: option
            });
        }
        if (value === 'target') {
            this.setState({
                target: option
            });
        }
        this.toggleSelect('');
    }

    submit() {
        const {name, target} = this.state;
        const {dataUrl, token} = this.props;

        service('uploadImage', token, {
            name,
            description: 'abc',
            parent,
            dataUrl
        })
    }

    stopPropagation(e){
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    render() {
        const {name, target, showSelect, selectOptions} = this.state;
        const {dataUrl, token} = this.props;
        const data = {
            description: 'test',
            dataUrl,
            name: 'ss'
        };

        return (
            <div className={cx('con')}>
                <div className={cx('img')}>
                    <img src={dataUrl}/>
                </div>
                <div className={cx('body')}>
                    <div className={cx('main')} onClick={() => this.toggleSelect('')}>
                        <div className={cx('uploader')} onClick={e => {this.stopPropagation(e);this.submit()}}>
                            <IconButton appearance={'primary'} size={'lg'} icon={<Icon icon="check"/>} circle/>
                        </div>
                        <div className={cx('info')} onClick={this.stopPropagation}>
                            {showSelect !== 'target' &&
                                <div className={cx('input')}>
                                    <Icon icon="image"/>
                                    <Input
                                        size={'xs'}
                                        value={name}
                                        onFocus={() => this.updateSelectOptions('name')}
                                        onChange={value => this.setState({name: value})}
                                    />
                                </div>
                            }
                            {!showSelect &&
                                <div className={cx('connect')}>
                                    <Icon icon={'import'}/>
                                </div>
                            }
                            {showSelect !== 'name' &&
                                <div className={cx('input')}>
                                    <Icon icon="folder-o"/>
                                    <Input
                                        size={'xs'}
                                        value={target}
                                        onFocus={() => this.updateSelectOptions('target')}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                    {showSelect &&
                        <div className={cx('select')}>
                            {selectOptions.map((option, index) => (
                                <div
                                    className={cx('option', {
                                        'option-selected': showSelect === 'name' ? option === name : option === target
                                    })}
                                    key={index}
                                    title={option}
                                    onClick={() => this.handleClickOption(showSelect, option)}
                                >{option}</div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        token: state.token,
        dataUrl: state.dataUrl,
        names: state.names,
        targets: state.targets
    })
)(Processing);
