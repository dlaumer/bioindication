import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';

type PopupPortalProps = {
    mount?: any;
    children?: any;
};
const PopupPortal: FC<PopupPortalProps> = ({
    mount = null,
    children = null,
}) => {
    console.log(children);
    console.log(mount);

    return createPortal(children, mount);
};

export default PopupPortal;
