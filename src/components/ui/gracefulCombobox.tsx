import * as React from "react";
import {useEffect, useState} from "react";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox";

type Props = {
    options: string[];
    value: string;
    onChange: (value: string) => void
    placeholder?: string;
}

export function GracefulCombobox(props: Props) {
    const {options, value, onChange, placeholder = "Select or type..."} = props;

    const [filteredOptions, setFilteredOptions] = useState<string[]>(options);

    useEffect(() => {
        setFilteredOptions(
            options.filter((option) =>
                option.toLowerCase().includes(value.toLowerCase())
            )
        );
    }, [value, options]);

    return (
        <Combobox value={value} onValueChange={value => onChange(value ?? "")}>
            <ComboboxInput
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <ComboboxContent>
                {filteredOptions.length > 0 ? (
                    <ComboboxList>
                        {filteredOptions.map((option) => (
                            <ComboboxItem key={option} value={option}>
                                {option}
                            </ComboboxItem>
                        ))}
                    </ComboboxList>
                ) : <ComboboxEmpty>No items found.</ComboboxEmpty>}
            </ComboboxContent>
        </Combobox>
    );
}