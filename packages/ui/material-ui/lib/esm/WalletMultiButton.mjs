import { FileCopy as CopyIcon, LinkOff as DisconnectIcon, SwapHoriz as SwitchIcon } from '@mui/icons-material';
import { Button, Collapse, Fade, ListItemIcon, Menu, MenuItem, styled } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import React, { useMemo, useState } from 'react';
import { useWalletDialog } from './useWalletDialog.mjs';
import { WalletConnectButton } from './WalletConnectButton.mjs';
import { WalletDialogButton } from './WalletDialogButton.mjs';
import { WalletIcon } from './WalletIcon.mjs';
const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiList-root': {
        padding: 0,
    },
    '& .MuiListItemIcon-root': {
        marginRight: theme.spacing(),
        minWidth: 'unset',
        '& .MuiSvgIcon-root': {
            width: 20,
            height: 20,
        },
    },
}));
const WalletActionMenuItem = styled(MenuItem)(({ theme }) => ({
    padding: theme.spacing(1, 2),
    boxShadow: 'inset 0 1px 0 0 ' + 'rgba(255, 255, 255, 0.1)',
    '&:hover': {
        boxShadow: 'inset 0 1px 0 0 ' + 'rgba(255, 255, 255, 0.1)' + ', 0 1px 0 0 ' + 'rgba(255, 255, 255, 0.05)',
    },
}));
const WalletMenuItem = styled(WalletActionMenuItem)(({ theme }) => ({
    padding: 0,
    '& .MuiButton-root': {
        borderRadius: 0,
    },
}));
export const WalletMultiButton = ({ color = 'primary', variant = 'contained', type = 'button', children, ...props }) => {
    const { publicKey, wallet, disconnect } = useWallet();
    const { setOpen } = useWalletDialog();
    const [anchor, setAnchor] = useState();
    const base58 = useMemo(() => publicKey === null || publicKey === void 0 ? void 0 : publicKey.toBase58(), [publicKey]);
    const content = useMemo(() => {
        if (children)
            return children;
        if (!wallet || !base58)
            return null;
        return base58.slice(0, 4) + '..' + base58.slice(-4);
    }, [children, wallet, base58]);
    if (!wallet) {
        return (React.createElement(WalletDialogButton, { color: color, variant: variant, type: type, ...props }, children));
    }
    if (!base58) {
        return (React.createElement(WalletConnectButton, { color: color, variant: variant, type: type, ...props }, children));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { color: color, variant: variant, type: type, startIcon: React.createElement(WalletIcon, { wallet: wallet }), onClick: (event) => setAnchor(event.currentTarget), "aria-controls": "wallet-menu", "aria-haspopup": "true", ...props }, content),
        React.createElement(StyledMenu, { id: "wallet-menu", anchorEl: anchor, open: !!anchor, onClose: () => setAnchor(undefined), marginThreshold: 0, TransitionComponent: Fade, transitionDuration: 250, keepMounted: true, anchorOrigin: {
                vertical: 'top',
                horizontal: 'left',
            } },
            React.createElement(WalletMenuItem, { onClick: () => setAnchor(undefined) },
                React.createElement(Button, { color: color, variant: variant, type: type, startIcon: React.createElement(WalletIcon, { wallet: wallet }), onClick: (event) => setAnchor(undefined), fullWidth: true, ...props }, wallet.adapter.name)),
            React.createElement(Collapse, { in: !!anchor },
                React.createElement(WalletActionMenuItem, { onClick: async () => {
                        setAnchor(undefined);
                        await navigator.clipboard.writeText(base58);
                    } },
                    React.createElement(ListItemIcon, null,
                        React.createElement(CopyIcon, null)),
                    "Copy address"),
                React.createElement(WalletActionMenuItem, { onClick: () => {
                        setAnchor(undefined);
                        setOpen(true);
                    } },
                    React.createElement(ListItemIcon, null,
                        React.createElement(SwitchIcon, null)),
                    "Change wallet"),
                React.createElement(WalletActionMenuItem, { onClick: () => {
                        setAnchor(undefined);
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        disconnect().catch(() => {
                            // Silently catch because any errors are caught by the context `onError` handler
                        });
                    } },
                    React.createElement(ListItemIcon, null,
                        React.createElement(DisconnectIcon, null)),
                    "Disconnect")))));
};
//# sourceMappingURL=WalletMultiButton.js.map