import { Close as CloseIcon, ExpandLess as CollapseIcon, ExpandMore as ExpandIcon } from '@mui/icons-material';
import { Button, Collapse, Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, styled, } from '@mui/material';
import { WalletReadyState } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import React, { useCallback, useMemo, useState } from 'react';
import { useWalletDialog } from './useWalletDialog.mjs';
import { WalletListItem } from './WalletListItem.mjs';
const RootDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        width: theme.spacing(40),
        margin: 0,
    },
    '& .MuiDialogTitle-root': {
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        justifyContent: 'space-between',
        lineHeight: theme.spacing(5),
        '& .MuiIconButton-root': {
            flexShrink: 1,
            padding: theme.spacing(),
            marginRight: theme.spacing(-1),
            color: theme.palette.grey[500],
        },
    },
    '& .MuiDialogContent-root': {
        padding: 0,
        '& .MuiCollapse-root': {
            '& .MuiList-root': {
                background: theme.palette.grey[900],
            },
        },
        '& .MuiList-root': {
            background: theme.palette.grey[900],
            padding: 0,
        },
        '& .MuiListItem-root': {
            boxShadow: 'inset 0 1px 0 0 ' + 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
                boxShadow: 'inset 0 1px 0 0 ' + 'rgba(255, 255, 255, 0.1)' + ', 0 1px 0 0 ' + 'rgba(255, 255, 255, 0.05)',
            },
            padding: 0,
            '& .MuiButton-endIcon': {
                margin: 0,
            },
            '& .MuiButton-root': {
                color: theme.palette.text.primary,
                flexGrow: 1,
                justifyContent: 'space-between',
                padding: theme.spacing(1, 3),
                borderRadius: undefined,
                fontSize: '1rem',
                fontWeight: 400,
            },
            '& .MuiSvgIcon-root': {
                color: theme.palette.grey[500],
            },
        },
    },
}));
export const WalletDialog = ({ title = 'Select your wallet', featuredWallets = 3, onClose, ...props }) => {
    const { wallets, select } = useWallet();
    const { open, setOpen } = useWalletDialog();
    const [expanded, setExpanded] = useState(false);
    const [featured, more] = useMemo(() => {
        const supportedWallets = wallets.filter((wallet) => wallet.readyState !== WalletReadyState.Unsupported);
        return [supportedWallets.slice(0, featuredWallets), supportedWallets.slice(featuredWallets)];
    }, [wallets, featuredWallets]);
    const handleClose = useCallback((event, reason) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (onClose)
            onClose(event, reason);
        if (!event.defaultPrevented)
            setOpen(false);
    }, [setOpen, onClose]);
    const handleWalletClick = useCallback((event, walletName) => {
        select(walletName);
        handleClose(event);
    }, [select, handleClose]);
    const handleExpandClick = useCallback(() => setExpanded(!expanded), [setExpanded, expanded]);
    return (React.createElement(RootDialog, { open: open, onClose: handleClose, ...props },
        React.createElement(DialogTitle, null,
            title,
            React.createElement(IconButton, { onClick: handleClose, size: "large" },
                React.createElement(CloseIcon, null))),
        React.createElement(DialogContent, null,
            React.createElement(List, null,
                featured.map((wallet) => (React.createElement(WalletListItem, { key: wallet.adapter.name, onClick: (event) => handleWalletClick(event, wallet.adapter.name), wallet: wallet }))),
                more.length ? (React.createElement(React.Fragment, null,
                    React.createElement(Collapse, { in: expanded, timeout: "auto", unmountOnExit: true },
                        React.createElement(List, null, more.map((wallet) => (React.createElement(WalletListItem, { key: wallet.adapter.name, onClick: (event) => handleWalletClick(event, wallet.adapter.name), wallet: wallet }))))),
                    React.createElement(ListItem, null,
                        React.createElement(Button, { onClick: handleExpandClick },
                            expanded ? 'Less' : 'More',
                            " options",
                            expanded ? React.createElement(CollapseIcon, null) : React.createElement(ExpandIcon, null))))) : null))));
};
//# sourceMappingURL=WalletDialog.js.map