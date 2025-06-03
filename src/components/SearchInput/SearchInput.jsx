import styles from './SearchInput.module.css';
import { useState, useMemo, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';

// Funciones de fetch con mejor manejo de errores
const fetchProvinces = async () => {
    const res = await fetch('https://apis.datos.gob.ar/georef/api/provincias?campos=nombre');
    if (!res.ok) throw new Error('Error al cargar provincias');
    const data = await res.json();
    return data.provincias.map(p => p.nombre);
};

const fetchCities = async ({ queryKey }) => {
    const [_, province] = queryKey;
    if (!province) return [];

    const res = await fetch(
        `https://apis.datos.gob.ar/georef/api/municipios?provincia=${encodeURIComponent(province)}&max=1000&campos=nombre`
    );
    if (!res.ok) throw new Error('Error al cargar ciudades');
    const data = await res.json();
    return data.municipios.map(m => m.nombre);
};

export default function SearchInput({ onChange , province= "", city= "", isDisabled = false}) {
    const [provinceInput, setProvinceInput] = useState(province? province : "");
    const [cityInput, setCityInput] = useState(city? city : "");
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(province? province : "");

    const queryClient = useQueryClient();

    const {
        data: provincias = [],
        isLoading: loadingProvinces,
        error: errorProvincias
    } = useQuery('province', fetchProvinces, {
        staleTime: 24 * 60 * 60 * 1000,
        retry: 2,
    });

    const {
        data: ciudades = [],
        isLoading: loadingCitys,
        error: errorCiudades
    } = useQuery(['city', provinciaSeleccionada], fetchCities, {
        enabled: !!provinciaSeleccionada,
        staleTime: 60 * 60 * 1000,
    });

    useEffect(() => {
        return() => {
            queryClient.removeQueries('provincias')
            queryClient.removeQueries('ciudades')
        };
    }, [queryClient])

    const filterProvincias = useMemo(() => (
        provincias
            .filter(prov => prov.toLowerCase().includes(provinceInput.toLowerCase()))
            .slice(0, 3)
    ), [provincias, provinceInput]);

    const filterCitys = useMemo(() => (
        ciudades
            .filter(ciudad => ciudad.toLowerCase().includes(cityInput.toLowerCase()))
            .slice(0, 3)
    ), [ciudades, cityInput]);

    const handleProvinciaChange = (e) => {
        const newValue = e.target.value;
        setProvinceInput(newValue);

        if (provincias.includes(newValue)) {
            setProvinciaSeleccionada(newValue);
            onChange({ target: { name: 'province', value: newValue } });
        } else {
            setProvinciaSeleccionada("");
        }
    };

    const handleProvinciaBlur = () => {
        if (!provincias.includes(provinceInput)) {
            setProvinceInput("");
            onChange({ target: { name: 'province', value: '' } });
        }
    };

    const handleCiudadChange = (e) => {
        const newValue = e.target.value;
        setCityInput(newValue);
        onChange({ target: { name: 'city', value: newValue } });
    };

    const error = errorProvincias || errorCiudades;

    return (
        <div className={styles.container_inputs}>
            {error && (
                <div className={styles.error}>
                    Error al cargar los datos: {error.message}
                </div>
            )}

            <div className={styles.c_input1}>
                <input
                    className={styles.input_field}
                    list="provinciasList"
                    value={provinceInput}
                    onChange={handleProvinciaChange}
                    onBlur={handleProvinciaBlur}
                    placeholder={loadingProvinces ? "Cargando provincias..." : "Provincia"}
                    disabled={loadingProvinces || isDisabled}
                />
                <datalist id="provinciasList">
                    {filterProvincias.map((provincia, index) => (
                        <option key={`pov-${index}`} value={provincia} />
                    ))}
                </datalist>
            </div>

            <div className={styles.separator}>
                <span className={styles.bar}>/</span>
            </div>

            <div className={styles.c_input2}>
                <input
                    className={styles.input_field}
                    list="ciudadesList"
                    value={cityInput}
                    onChange={handleCiudadChange}
                    disabled={!provinciaSeleccionada || loadingCitys || isDisabled}
                    placeholder={
                        !provinciaSeleccionada ? "Seleccione provincia primero" :
                            loadingCitys ? "Cargando ciudades..." : "Ciudad"
                    }
                />
                <datalist id="ciudadesList">
                    {filterCitys.map((ciudad, index) => (
                        <option key={`city-${index}`} value={ciudad} />
                    ))}
                </datalist>
            </div>
        </div>
    );
}