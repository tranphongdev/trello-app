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
} from '@dnd-kit/core';

import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '~/utils/sorts';
import { useEffect, useState } from 'react';

import { arrayMove } from '@dnd-kit/sortable';

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

    useEffect(() => {
        setOrderedColumnsState(mapOrder(board?.columns, board?.columnOrderIds, '_id'));
    }, [board]);

    const handleDragStart = (e) => {
        setActiveDragItemId(e?.active?.id);
        setActiveDragItemType(
            e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN,
        );
        setActiveDragItemData(e?.active?.data?.current);
    };

    const handleDragEnd = (e) => {
        const { active, over } = e;

        if (!over) return;

        if (active.id !== over.id) {
            // Lay vi tri cu tu active
            const oldIndex = orderedColumnsState.findIndex((c) => c._id === active.id);
            // Lay vi tri mới tu over
            const newIndex = orderedColumnsState.findIndex((c) => c._id === over.id);

            const dndOrderedColumns = arrayMove(orderedColumnsState, oldIndex, newIndex);
            // const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);

            setOrderedColumnsState(dndOrderedColumns);
        }

        setActiveDragItemId(null);
        setActiveDragItemType(null);
        setActiveDragItemData(null);
    };

    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: { active: { opacity: '0.5' } },
        }),
    };

    return (
        <DndContext onDragEnd={handleDragEnd} sensors={sensors} onDragStart={handleDragStart}>
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
