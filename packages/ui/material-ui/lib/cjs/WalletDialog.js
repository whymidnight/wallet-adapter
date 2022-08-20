"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletDialog = void 0;
const icons_material_1 = require("@mui/icons-material");
const material_1 = require("@mui/material");
const wallet_adapter_base_1 = require("@solana/wallet-adapter-base");
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const react_1 = __importStar(require("react"));
const useWalletDialog_1 = require("./useWalletDialog");
const WalletListItem_1 = require("./WalletListItem");
const RootDialog = (0, material_1.styled)(material_1.Dialog)(({ theme }) => ({
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
const WalletDialog = (_a) => {
    var { title = 'Select your wallet', featuredWallets = 3, onClose } = _a, props = __rest(_a, ["title", "featuredWallets", "onClose"]);
    const { wallets, select } = (0, wallet_adapter_react_1.useWallet)();
    const { open, setOpen } = (0, useWalletDialog_1.useWalletDialog)();
    const [expanded, setExpanded] = (0, react_1.useState)(false);
    const [featured, more] = (0, react_1.useMemo)(() => {
        const supportedWallets = wallets.filter((wallet) => wallet.readyState !== wallet_adapter_base_1.WalletReadyState.Unsupported);
        return [supportedWallets.slice(0, featuredWallets), supportedWallets.slice(featuredWallets)];
    }, [wallets, featuredWallets]);
    const handleClose = (0, react_1.useCallback)((event, reason) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (onClose)
            onClose(event, reason);
        if (!event.defaultPrevented)
            setOpen(false);
    }, [setOpen, onClose]);
    const handleWalletClick = (0, react_1.useCallback)((event, walletName) => {
        select(walletName);
        handleClose(event);
    }, [select, handleClose]);
    const handleExpandClick = (0, react_1.useCallback)(() => setExpanded(!expanded), [setExpanded, expanded]);
    return (react_1.default.createElement(RootDialog, Object.assign({ open: open, onClose: handleClose }, props),
        react_1.default.createElement(material_1.DialogTitle, null,
            title,
            react_1.default.createElement(material_1.IconButton, { onClick: handleClose, size: "large" },
                react_1.default.createElement(icons_material_1.Close, null))),
        react_1.default.createElement(material_1.DialogContent, null,
            react_1.default.createElement(material_1.List, null,
                featured.map((wallet) => (react_1.default.createElement(WalletListItem_1.WalletListItem, { key: wallet.adapter.name, onClick: (event) => handleWalletClick(event, wallet.adapter.name), wallet: wallet }))),
                more.length ? (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(material_1.Collapse, { in: expanded, timeout: "auto", unmountOnExit: true },
                        react_1.default.createElement(material_1.List, null, more.map((wallet) => (react_1.default.createElement(WalletListItem_1.WalletListItem, { key: wallet.adapter.name, onClick: (event) => handleWalletClick(event, wallet.adapter.name), wallet: wallet }))))),
                    react_1.default.createElement(material_1.ListItem, null,
                        react_1.default.createElement(material_1.Button, { onClick: handleExpandClick },
                            expanded ? 'Less' : 'More',
                            " options",
                            expanded ? react_1.default.createElement(icons_material_1.ExpandLess, null) : react_1.default.createElement(icons_material_1.ExpandMore, null))))) : null))));
};
exports.WalletDialog = WalletDialog;
//# sourceMappingURL=WalletDialog.js.map