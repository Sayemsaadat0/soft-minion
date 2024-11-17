export const showDatePicker = (e: React.MouseEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.showPicker) {
        target.showPicker(); // Open date picker programmatically
    }
};
