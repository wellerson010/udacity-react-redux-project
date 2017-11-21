import store from '../store';
import { ADD_VOTE, DOWN_VOTE, POST, REMOVE_VOTE, UP_VOTE } from '../constants';
import { calculateAmountVote, vote as voteService } from './vote-service';
import { changeVotePost  } from '../post/post-actions';
import { changeVoteComment } from '../comment/comment-action';

export function addVote(id, vote){
    return {
        type: ADD_VOTE,
        id,
        vote
    }
}

export function removeVote(id){
    return {
        type: REMOVE_VOTE,
        id
    }
}

export function vote(id, typeVote, type){
    const { vote: voteState } = store.getState();
    const userAlreadyVoted = (voteState[id]);

    return async dispatch => {
        const actionCallbackType = (type == POST)?changeVotePost:changeVoteComment;

        if (userAlreadyVoted){
            if (voteState[id] === typeVote){
                typeVote = (typeVote === UP_VOTE) ? DOWN_VOTE : UP_VOTE;

                await voteService(id, typeVote, type);
                dispatch(removeVote(id));

                const amount = calculateAmountVote(typeVote);

                dispatch(actionCallbackType(id, typeVote, amount));
            }
            else {
                await voteService(id, typeVote, type);
                await voteService(id, typeVote, type);
                /* to chamando a API duas vezes por causa de uma limitação da API. Isso acontece quando o usuário
                altera o voto de um item em que ele já votou. Por exemplo:
                - item possui 6 votos
                - usuário vota a favor, acumulando 7 a partir de então
                - usuário trocar seu voto, passando a votar contra
                - nesse momento, o item deve acumular 5 votos (diminuição de 2, o que não é suportado pela API)
                */

                dispatch(addVote(id, typeVote));

                const amount = calculateAmountVote(typeVote, true);
                dispatch(actionCallbackType(id, typeVote, amount));
            }
        }
        else {
            await voteService(id, typeVote, type);

            dispatch(addVote(id, typeVote));

            const amount = calculateAmountVote(typeVote);
            dispatch(actionCallbackType(id, typeVote, amount));
        }
    }
}