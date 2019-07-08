import React from "react";
import styles from "./OneInputModal.scss";
import classNames from "classnames/bind";
import ModalWrapper from "../ModalWrapper";
import Button from "../../common/Button";
import OutlinedTextField from "../OutlinedTextField";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserFriends, faFileAlt, faFileSignature } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faUserFriends);
library.add(faFileAlt);
library.add(faFileSignature);

const cx = classNames.bind(styles);

class OneInputModal extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            // modal_title: '222'
        };
    };

    handleTextChange = (event) => {
        this.setState({ name: event.target.value });
    };

    handleOnClick=(id)=>{

        const { onConfirm, onCancel } = this.props;
        let name = (this.state.name===null || this.state.name==='')?'Empty':this.state.name;
        onConfirm(id, name); 
        onCancel();
    }

    render(){
        const { visible, onConfirm, onCancel, id,
                modal_icon, modal_title, modal_content, btn_name } = this.props;

        const { handleTextChange,handleOnClick } = this;
        return (
            <div tabIndex="-1"
            onKeyDown={(e) => {
                if(e.key === 'Enter') {
                    handleOnClick(id);
                }
                if(e.keyCode === 27) {
                    onCancel();
                }
            }}>
            <ModalWrapper visible={visible}>
                <div className={cx("question")}>
                    <div className={cx("title")}>
                        <FontAwesomeIcon icon={modal_icon} size="2x" color="#1C90FB" />
                        &nbsp;&nbsp;&nbsp;&nbsp;<strong>{modal_title}</strong>
                    </div>
                    <br />
                    <div className={cx("description")}>
                        {modal_content}
                    </div>
                    <br />
                    {/* <h3>폴더명</h3> */}
                    <OutlinedTextField handleText={handleTextChange} value={this.props.text}/>
                </div>

                <div className={cx("options")}>
                    <Button theme='outline' onClick={onCancel}>취소</Button>
                    <Button theme='outline' onClick={(e)=>{handleOnClick(id)}}>
                        {btn_name}
                    </Button>
                </div>
            </ModalWrapper>
            </div>
        )
    }
}

export default OneInputModal;
