import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue, get } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

interface AddressAutocompleteProps {
    name: string;
    register: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    errors: FieldErrors<any>;
    className?: string;
    placeholder: string;
}

interface PhotonFeatures {
    properties: {
        osm_id: number;
        osm_type: string;
        name?: string;
        street?: string;
        city?: string;
        state?: string;
        country?: string;
    }
    geometry: {
        coordinates: [number, number] // [lon, lat]
    }
}

export default function AddressAutocomplete({
    name,
    register,
    setValue,
    errors,
    className = "",
    placeholder = "Enter address",
}: AddressAutocompleteProps){
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const [address, setAddress] = useState("");
    const [open, setOpen] = useState(false);
    const [results, setResults] = useState<PhotonFeatures[]>([]);
    const [selected, setSelected] = useState(false);

    const errorMessage = get(errors, `${name}.address`)?.message ?? "";

    const searchAddress = async (text: string) => {
        if(!text || text.length < 3) {
            setResults([]);
            return;
        }

        try {
            const {data} = await axios.get(`https://photon.komoot.io/api/?q=${encodeURIComponent(text)}&limit=5`)
            const result: PhotonFeatures[] = data?.features ?? [];

            const uniqueResults = result.filter(
                (item, index, self) => 
                    index === 
                    self.findIndex(
                        (r) => 
                            r.properties.osm_type === item.properties.osm_type &&
                            r.properties.osm_id === item.properties.osm_id
                    )
            )
            
            setResults(uniqueResults);
        } catch (error) {
            if(axios.isAxiosError(error)) {
                const msg = error.response?.data?.message || "Network Error";
                console.log(msg);
            } else {
                console.log(error);
            }
        }
    }

    const debouncedSearch = useDebouncedCallback(
        (value: string) => {
            searchAddress(value);
        },
        300
    )

    const onEmpty = (text: string) => {
        if(!text) {
            setSelected(false);
            setValue(name, {
                address: "",
                coordinates: {}
            })
        }
    }

    const handleSelect = (item: PhotonFeatures, label: string) => {
        setSelected(true);
        setAddress(label);

        setValue(name, {
            address: label,
            coordinates: {
                lat: item.geometry.coordinates[1],
                lon: item.geometry.coordinates[0]
            }
        },{
            shouldDirty: true,
            shouldValidate: true
        })

        setOpen(false);
        setResults([]);
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if(
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    },[])

    return (
        <div ref={wrapperRef} className={`relative ${className}`}>
            <div className={`${selected && "bg-light-primary"} border-2 border-dark-secondary p-2 rounded-md flex items-center gap-1 text-xs font-semibold shadow-sm`}>
                <img src="location.svg" width="18px" height="18px" />
                <input  
                    required
                    type="text" 
                    value={address}
                    placeholder={placeholder}
                    onFocus={() => setOpen(true)}
                    onChange={(e) => {
                        onEmpty(e.target.value)
                        setAddress(e.target.value)
                        debouncedSearch(e.target.value)
                    }}
                    className="outline-none w-full"
                />
                <input type="hidden" {...register(name)}/>
            </div>

            {errorMessage && results.length <= 0 && (
                <p className="text-red-500 text-sm w-full h-2">{errorMessage}</p>
            )}

            {address === "" && results.length <= 0 && !errorMessage && (
                <p className="absolute text-[9px] align-text-top px-2">Start typing to search places ...</p>
            )}

            {open && results.length > 0 && (
                <ul className="w-full absolute z-[9] border border-dark-secondary bg-dark-secondary space-y-[1px] shadow-lg">
                    {results.map((item) => {
                        const p = item.properties;

                        const label = [
                            p.name,
                            p.street,
                            p.city,
                            p.state,
                            p.country
                        ].filter(Boolean).join(", ");

                        return (
                            <li
                              aria-required
                              key={`${p.osm_type}-${p.osm_id}`}
                              onClick={() => handleSelect(item, label)}
                              className="p-1 bg-light-primary text-[10px] cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
                            >
                                {label}
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}