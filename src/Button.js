import React, {Component} from 'react';
import './Button.css';
import PropTypes from 'prop-types';


/*  Button组件接受六个props
    url:      String   必须，要获取数据的url
    method：  String   可选，可以是GET和POST，默认是'GET'
    data:     Object   可选，要发送的数据
    onGetData:    Function 可选，点击后回调函数，参数是返回的数据
    size:     String   可选，调节按钮的大小，可选择small，middle，big
    text:     String   可选，按钮上的文字
 */
class Button extends Component {

    constructor() {
        super(...arguments);
        this.state = {
            disabled: false
        };
    }

    componentDidCatch(error, errorInfo){
        console.log(error, errorInfo);
    }

    componentDidMout() {
        //设置button宽度以防止按钮中文本变为‘发送中’的时候按钮宽度变化
        const {button} = this.refs;
        button.style.width = button.offsetWidth + 20 + 'px';
    }

    //点击按钮后
    //先判断
    onClick() {
        let self = this;
        const {props} = this;
        let method = props.method || 'GET';
        let url = props.url;
        let data = props.data;
        let onGetData = props.onGetData;

        if (typeof method !== 'string' || !this.validateMethod(method)) {
            onGetData( new Error('Prop method need to be string and value should be GET or POST'));
            return;
        }
        if (!url || typeof url !== 'string') {
            onGetData( new Error('Prop url is required and should be string'));
            return;
        }
        if (typeof onGetData !== 'function') {
            onGetData( new Error('Prop onGetData should be function'));
            return;
        }
        if(data && typeof data !== 'object'  ){
            onGetData( new Error('Prop data should be obj'));
            return;
        }

        this.toggleDisabled();

        method = method.toUpperCase();
        let promise = this.send(method, url, data);
        promise.then((data)=> {
            onGetData(data);
            self.toggleDisabled();

        })
        .catch(e => {
            onGetData(e);
            self.toggleDisabled();
        })
    }

    //检验method的类型
    validateMethod(method) {
        let reg = /^get|post$/i;
        return reg.test(method);
    }

    //转换按钮是否可用
    toggleDisabled() {
        this.setState({
            disabled: !this.state.disabled,
            sending: !this.state.sending
        });
    }

    //将data中的键值对加入url中
    addUrlParams(url, data){
        //检测url中是否带有？
        if(url.indexOf('?') === -1){
            url += '?';
        } else {
            url += '&';
        }
        let keys = Object.keys(data);
        keys.forEach((key, idx) => {
            url += decodeURIComponent(key) + '=' + decodeURIComponent(data[key]);
            if(idx !== keys.length - 1){
                url += '&';
            }
        });
        return url;
    }

    //用于发送数据给服务器，返回一个promise对象
    //接受三个参数
    //method : String
    //url:     String
    //data:    Obj
    //
    //promise对象均接受一个参数
    //resolve:  data String
    //reject:   error Error
    send(method, url, data) {
        return new Promise((resolve, reject) => {
            let xhr = new window.XMLHttpRequest();
            xhr.open(method, url, true);

            //若是需要传送数据且method为POST
            //则将data转化为字符串
            if(data){
                if(method === 'POST'){
                    data = JSON.stringify(data);
                } else if(method === 'GET') {
                    url = this.addUrlParams(url, data);
                    console.log(url);
                }
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                        console.log(xhr.responseText)
                    } else {
                        reject(new Error(xhr.statusText));
                    }
                }
            };
            xhr.send(data);
        })

    }

    render() {
        const {disabled} = this.state;
        let size = this.props.size;
        let text = this.props.text;
        size = (size && typeof size==='string') ?  size : 'big';
        let className = 'c-button ' + size;

        text = disabled ?  '发送中' : ((text && typeof text==='string') ?  text : '发送');
        return (
            <button ref={'button'} className={className} disabled={disabled} onClick={this.onClick.bind(this)}>{text}</button>
        );
    }
}

Button.propTypes = {
    url: PropTypes.string.isRequired,
    method: PropTypes.string,
    onGetData: PropTypes.func,
    data: PropTypes.object,
    size: PropTypes.string,
    text: PropTypes.string
}

export default Button;
