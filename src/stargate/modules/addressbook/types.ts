import { MsgCreateAddress, MsgUpdateAddress, MsgDeleteAddress } from './proto-types/tx';

const PREFIX = '/cudoventures.cudosnode.addressbook.';

export const msgCreateAddress = {
    typeUrl: PREFIX.concat('MsgCreateAddress'),
    type: MsgCreateAddress
};

export const msgUpdateAddress = {
    typeUrl: PREFIX.concat('MsgUpdateAddress'),
    type: MsgUpdateAddress
};

export const msgDeleteAddress = {
    typeUrl: PREFIX.concat('MsgDeleteAddress'),
    type: MsgDeleteAddress
};