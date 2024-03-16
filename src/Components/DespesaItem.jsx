import React, { useCallback } from 'react';

const DespesaItem = ({ despesa, onDelete }) => {
    const handleDelete = useCallback(() => {
        onDelete(despesa.id);
    }, [despesa.id, onDelete]);

    const { dia, valor, observacao, categoria } = despesa;

    return (
        <li onClick={handleDelete} className='flex items-center justify-between py-2 border-b-2 border-primary cursor-pointer'>
            <div>
                <span className='font-bold ml-2'>Valor:</span> R$ {valor.toFixed(2)} |
                <span className='font-bold'></span> {dia} |
                <span className='font-bold ml-2'>Obs:</span> {observacao} |
                <span className='font-bold ml-2'>Categoria:</span> {categoria}
            </div>
        </li>
    );
};

export default DespesaItem;
