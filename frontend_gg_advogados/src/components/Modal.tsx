import React from 'react';
import style from '@/css/Modal.module.css'

// props necessarias para que o componente pai  controle o modal
interface ModalProps {
  isOpen: boolean;
  mensagem : string

  // mudará o estilo da mensagem dependendo do valor
  isError : boolean

  // função passada pelo componente pai
  closeModal(): void
}


const Modal: React.FC<ModalProps> = ({ isOpen,mensagem,isError,closeModal}) => {
  if (!isOpen) return null;

  return (
    <div className={style.modal_fundo}>
      <div className={`${style.modal}`}>
        <div className={`${style.modal_content}`}>
            <p style={{ color: isError ? 'red' : 'black' }} > {mensagem} </p>
          <button className={style.botao_modal_gray} onClick={closeModal}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;