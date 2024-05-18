import Box from '@mui/material/Box';
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor,
    DragOverlay,
    defaultDropAnimationSideEffects,
    closestCorners,
    pointerWithin,
    getFirstCollision,
} from '@dnd-kit/core';

import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '~/utils/sorts';
import { useCallback, useEffect, useRef, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { cloneDeep, isEmpty } from 'lodash';

import { generatePlaceholderCard } from '~/utils/formatters';
import Column from './ListColumns/Column/Column';
import Card from './ListColumns/Column/ListCards/Card/Card';

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
};

function BoardContent({ board }) {
    // Chuột di chuyển 10px thì mới kích hoạt event
    // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } });
    const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
    const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } });

    const sensors = useSensors(mouseSensor, touchSensor);

    const [orderedColumnsState, setOrderedColumnsState] = useState([]);

    const [activeDragItemId, setActiveDragItemId] = useState(null);
    const [activeDragItemType, setActiveDragItemType] = useState(null);
    const [activeDragItemData, setActiveDragItemData] = useState(null);
    const [oldColumnWhenDragingCard, setOldColumnWhenDragingCard] = useState(null);

    // Điểm va chạm cuối cùng trước đó(xử lý thuật toán va chạm)
    const lastOverId = useRef(null);

    useEffect(() => {
        setOrderedColumnsState(mapOrder(board?.columns, board?.columnOrderIds, '_id'));
    }, [board]);

    // Tìm 1 column theo id
    const findColumnByCardId = (cardId) => {
        return orderedColumnsState.find((column) => column.cards.map((card) => card._id)?.includes(cardId));
    };

    // Function chung xử lý việc cập nhật lại state trong trường hợp di chuyển giữa các column khác nhau
    const moveCardBetweenDifferenttColumns = (
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
    ) => {
        setOrderedColumnsState((prevColumns) => {
            const overCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCardId);

            let newCardIndex;
            const isBelowOverItem =
                active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height;
            const modifier = isBelowOverItem ? 1 : 0;

            newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1;

            const nextColumns = cloneDeep(prevColumns);
            const nextActiveColumn = nextColumns.find((column) => column._id === activeColumn._id);
            const nextOverColumn = nextColumns.find((column) => column._id === overColumn._id);

            if (nextActiveColumn) {
                nextActiveColumn.cards = nextActiveColumn.cards.filter((card) => card._id !== activeDraggingCardId);

                if (isEmpty(nextActiveColumn.cards)) {
                    nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)];
                }

                nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card._id);
            }
            if (nextOverColumn) {
                nextOverColumn.cards = nextOverColumn.cards.filter((card) => card._id !== activeDraggingCardId);

                nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, {
                    ...activeDraggingCardData,
                    columnId: nextOverColumn._id,
                });
                nextOverColumn.cards = nextOverColumn.cards.filter((card) => !card.FE_PlaceholderCard);

                nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id);
            }

            return nextColumns;
        });
    };

    const handleDragStart = (e) => {
        setActiveDragItemId(e?.active?.id);
        setActiveDragItemType(
            e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN,
        );
        setActiveDragItemData(e?.active?.data?.current);

        if (e?.active?.data?.current?.columnId) {
            setOldColumnWhenDragingCard(findColumnByCardId(e?.active?.id));
        }
    };

    const handleDragOver = (e) => {
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

        const { active, over } = e;

        if (!active || !over) return;

        const {
            id: activeDraggingCardId,
            data: { current: activeDraggingCardData },
        } = active;
        const { id: overCardId } = over;

        const activeColumn = findColumnByCardId(activeDraggingCardId);
        const overColumn = findColumnByCardId(overCardId);

        if (!activeColumn || !overColumn) return;
        if (activeColumn._id !== overColumn._id) {
            moveCardBetweenDifferenttColumns(
                overColumn,
                overCardId,
                active,
                over,
                activeColumn,
                activeDraggingCardId,
                activeDraggingCardData,
            );
        }
    };

    const handleDragEnd = (e) => {
        const { active, over } = e;
        if (!active || !over) return;
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            const {
                id: activeDraggingCardId,
                data: { current: activeDraggingCardData },
            } = active;
            const { id: overCardId } = over;

            const activeColumn = findColumnByCardId(activeDraggingCardId);
            const overColumn = findColumnByCardId(overCardId);

            if (!activeColumn || !overColumn) return;

            if (oldColumnWhenDragingCard._id !== overColumn._id) {
                moveCardBetweenDifferenttColumns(
                    overColumn,
                    overCardId,
                    active,
                    over,
                    activeColumn,
                    activeDraggingCardId,
                    activeDraggingCardData,
                );
            } else {
                // Hành động kéo thả card trong cùng 1 column
                const oldCardIndex = oldColumnWhenDragingCard?.cadrs?.findIndex((c) => c._id === activeDragItemId);

                const newCardIndex = overColumn?.cards.findIndex((c) => c._id === overCardId);

                const dndOrderedCards = arrayMove(oldColumnWhenDragingCard?.cards, oldCardIndex, newCardIndex);

                setOrderedColumnsState((prev) => {
                    const nextColumns = cloneDeep(prev);

                    const targetColumn = nextColumns.find((c) => c._id === overColumn._id);

                    targetColumn.cards = dndOrderedCards;
                    targetColumn.cardOrderIds = dndOrderedCards.map((c) => c._id);

                    return nextColumns;
                });
            }
        }

        // Xử lý kéo thả column
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            if (active.id !== over.id) {
                // Lay vi tri cu tu active
                const oldColumnIndex = orderedColumnsState.findIndex((c) => c._id === active.id);
                // Lay vi tri mới tu over
                const newColumnIndex = orderedColumnsState.findIndex((c) => c._id === over.id);
                const dndOrderedColumns = arrayMove(orderedColumnsState, oldColumnIndex, newColumnIndex);
                // const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);

                setOrderedColumnsState(dndOrderedColumns);
            }
        }

        // Những dữ liệu sau khi kéo thả phải đưa về dữ liệu ban đầu
        setActiveDragItemId(null);
        setActiveDragItemType(null);
        setActiveDragItemData(null);
        setOldColumnWhenDragingCard(null);
    };

    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: { active: { opacity: '0.5' } },
        }),
    };

    // args = arguments = Các đối số, tham số
    const collisionDetectionStrategy = useCallback(
        (args) => {
            if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
                return closestCorners({ ...args });
            }

            const pointerIntersections = pointerWithin(args);

            if (!pointerIntersections?.length) return;

            // const intersections = !!pointerIntersections?.length ? pointerIntersections : rectIntersection(args);

            let overId = getFirstCollision(pointerIntersections, 'id');

            if (overId) {
                const checkColumn = orderedColumnsState.find((column) => column._id === overId);
                if (checkColumn) {
                    overId = closestCorners({
                        ...args,
                        droppableContainers: args.droppableContainers.filter((container) => {
                            return container.id !== overId && checkColumn?.cardOrderIds?.includes(container.id);
                        })[0]?.id,
                    });
                }

                lastOverId.current = overId;
                return [{ id: overId }];
            }

            return lastOverId.current ? [{ id: lastOverId.current }] : [];
        },
        [activeDragItemType, orderedColumnsState],
    );

    return (
        <DndContext
            // collisionDetection={closestCorners}
            collisionDetection={collisionDetectionStrategy}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            sensors={sensors}
            onDragStart={handleDragStart}
        >
            <Box
                sx={{
                    width: '100%',
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
                    height: (theme) => theme.trello.boardContentHeight,
                    p: '10px 0',
                }}
            >
                <ListColumns columns={orderedColumnsState} />
                <DragOverlay dropAnimation={dropAnimation}>
                    {!activeDragItemType && null}
                    {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={activeDragItemData} />}
                    {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData} />}
                </DragOverlay>
            </Box>
        </DndContext>
    );
}

export default BoardContent;
