import React, { useState } from "react";
import classNames from "classnames";

import AuraButton from "../../../controls/AuraButton";

import styles from "./ItemCard.module.scss";

export interface ItemCardProps {
    name: string;
    showButton?: boolean;
    quantity?: {
        amount: number,
        unit: string
    };
}

const ItemCard: React.FC<ItemCardProps> = ({
    name, showButton, quantity
}) => {
    const [hovering, setHovering] = useState<boolean>(false);

    const createHoveringSetter = (state: boolean) => () => {
        setHovering(state);
    };

    const renderButton = () => {
        return (
            <AuraButton
                className={ classNames(
                    styles.button,
                    hovering && styles.hovering
                ) }
            >
                <i
                    className="fas fa-times"
                />
            </AuraButton>
        );
    };

    const renderDetails = () => {
        return (
            <div
                className={ styles.details }
            >
                <div
                    className={ styles.title }
                >
                    { name }
                </div>
                { quantity && (
                    <div
                        className={ styles.measurement }
                    >
                        { `${quantity.amount} ${quantity.unit}` }
                    </div>
                ) }
            </div>
        );
    };

    return (
        <div
            className={ styles.card }
            onMouseOver={ createHoveringSetter(true) }
            onMouseOut={ createHoveringSetter(false) }
        >
            { showButton && renderButton() }
            <div
                className={ styles.image }
            />
            { renderDetails() }
        </div>
    );
};

export default ItemCard;
