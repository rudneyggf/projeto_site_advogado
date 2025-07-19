import React from 'react';
import style from '@/css/Modal.module.css'

// props necessarias para que o componente de gerenciador controle o modal
interface ModalDecisaoProps {
  isOpen: boolean;
  onClose: () => void;
  deleteFunction: () =>  void | Promise<void> ;
  mensagem:string
}

const ModalDecisao: React.FC<ModalDecisaoProps> = ({ isOpen, onClose, deleteFunction , mensagem}) => {
  if (!isOpen) return null;

  return (
    <div className={style.modal_fundo}>
      <div className={`${style.modal}`}>
        <div className={`${style.modal_content}`}>
            <p> {mensagem} </p>
          <button className={style.botao_modal_sim} onClick={deleteFunction}>Sim</button>
          <button className={style.botao_modal_nao} onClick={onClose}>Não</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDecisao;