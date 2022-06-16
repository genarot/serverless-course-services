import {getEndedAuctions} from "../lib/getEndedAuctions";
import {closeAuction} from "../lib/closeAuction";
import createError from "http-errors";

export async function processAuctions(event, context) {
    console.log('Processing Auctions.');
    try {

        const auctionsToClose = await getEndedAuctions();

        const closePromises = auctionsToClose.map(auction => closeAuction(auction));

        await Promise.all(closePromises);

        // console.log('Auctions to Close:', auctionsToClose);
        return {closed: closePromises.length};
    } catch (error) {
        console.error('Error', error);
        throw new createError.InternalServerError(error);
    }
}

export const handler = processAuctions;
