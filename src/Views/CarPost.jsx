import  { useEffect, useState } from "react";
// import "../../styles/home.css";
// import { language } from "../component/lang";
import { useNavigate, useParams } from "react-router";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useWindowDimensions from "../components/useWindowDimensions";
import { Link } from "react-router-dom";

const language = {}

export const CarPost = () => {
    const isLanguage = false;
    const [currencies, setCurrencies] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";
    const navigate = useNavigate();
    const { type } = useParams();
    const [images, setImages] = useState(null);

    useEffect(() => {
        // const access_token = localStorage.getItem("access_token");
        // if (!access_token || !access_token.length) {
        //     navigate("/login");
        // }
        const today = new Date();
        const month = today.getMonth() + 1; // JavaScript months are 0-11
        const date = today.getDate(); // JavaScript months are 0-11
        const formattedMonth = month < 10 ? "0" + month : month;
        const formattedDate = date < 10 ? "0" + date : date;
        fetch(
            `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${today.getFullYear()}-${formattedMonth}-${formattedDate}/v1/currencies.json`
        )
            .then((response) => response.json())
            .then((result) => {
                setCurrencies(
                    moveToFront(
                        Object.keys(result).map((key) => key.toUpperCase()),
                        "ብር",
                        "USD",
                        "AED",
                        "EUR"
                    )
                );
                setSelectedCurrency("ብር");
            });
    }, []);

    function moveToFront(arr, first, second, third, fourth) {
        // Find the indices of the currencies
        const firstIndex = arr.indexOf(first);
        const secondIndex = arr.indexOf(second);
        const thirdIndex = arr.indexOf(third);
        const fourthIndex = arr.indexOf(fourth);

        // Remove the currencies from their original positions if they exist
        if (firstIndex !== -1) {
            arr.splice(firstIndex, 1);
        }
        if (secondIndex !== -1) {
            arr.splice(secondIndex, 1);
        }
        if (thirdIndex !== -1) {
            arr.splice(thirdIndex, 1);
        }
        if (fourthIndex !== -1) {
            arr.splice(fourthIndex, 1);
        }

        // Add the currencies to the beginning of the array
        arr.unshift(fourth);
        arr.unshift(third);
        arr.unshift(second);
        arr.unshift(first);

        return arr;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Retrieve input values
        const streetName = e.target.streetName.value || null;
        const city = e.target.city.value || null;
        const state = e.target.state.value || null;
        const country = e.target.country.value || null;
        const zipCode = e.target.zipCode.value || null;

        const name = e.target.name.value || null;
        const email = e.target.email.value || null;
        const phone = e.target.phone.value || null;

        const isForSale = type == "sale";
        const isNew = e.target.isNew.checked;
        const price = e.target.price.value || null;
        const year = e.target.year.value || null;
        const make = e.target.make.value || null;
        const sitSize = e.target.sitSize.value || null;
        const model = e.target.model.value || null;
        const mileage = (e.target.mileage && e.target.mileage.value) || null;
        const milesPerHour =
            (e.target.milesPerHour && e.target.milesPerHour.value) || null;
        const engineType =
            (e.target.engineType && e.target.engineType.value) || null;
        const transmission =
            (e.target.transmissionge && e.target.transmission.value) || null;
        const color = e.target.color.value || null;
        const fuelType = (e.target.fuelType && e.target.fuelType.value) || null;
        const condition = e.target.condition.value || null;
        const bodyStyle = e.target.bodyStyle.value || null;
        const acceleration =
            (e.target.acceleration && e.target.acceleration.value) || null;
        const horsePower =
            (e.target.horsePower && e.target.horsePower.value) || null;
        const torque = (e.target.torque && e.target.torque.value) || null;
        const interiorColor = e.target.interiorColor.value || null;
        const topSpeed = (e.target.topSpeed && e.target.topSpeed.value) || null;
        const hasSunroof = e.target.hasSunroof.checked;
        const hasNavigationSystem = e.target.hasNavigationSystem.checked;
        const hasBluetooth = e.target.hasBluetooth.checked;
        const hasAudioSystem = e.target.hasAudioSystem.checked;
        const numberOfAirbags = e.target.numberOfAirbags.value || null;
        const numberOfDoors = e.target.numberOfDoors.value || null;
        const description = e.target.description.value || null;

        // Do whatever you want with the retrieved values

        let data = {
            street_name: streetName,
            city: city,
            state: state,
            country: country,
            zip_code: zipCode,
            name: name,
            email: email,
            phone: phone,
            is_for_sale: isForSale,
            is_new: isNew,
            price: price,
            currency: selectedCurrency,
            year: year,
            make: make,
            sit_size: sitSize,
            model: model,
            mileage: mileage,
            miles_per_hour: milesPerHour,
            engine_type: engineType,
            transmission: transmission,
            color: color,
            fuel_type: fuelType,
            condition: condition,
            body_style: bodyStyle,
            acceleration: acceleration,
            horse_power: horsePower,
            torque: torque,
            interior_color: interiorColor,
            top_speed: topSpeed,
            has_sunroof: hasSunroof,
            has_navigation_system: hasNavigationSystem,
            has_bluetooth: hasBluetooth,
            has_audio_system: hasAudioSystem,
            number_of_airbags: numberOfAirbags,
            number_of_doors: numberOfDoors,
            description: description,
        };
        const form = new FormData();
        if (images) {
            images.forEach((image, index) => {
                form.append(`image_${index}`, image);
            });
        }
        form.append("data", JSON.stringify(data));
        // Send the POST request
        fetch(BACKEND_URL + "/cars", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
            body: form,
        })
            .then((response) => {
                if (response.status == 401) {
                    localStorage.removeItem("access_token");
                    navigate("/login");
                }
                if (!response.ok) throw new Error();
                return response.json();
            })
            .then((result) => {
                // Handle the response
                console.log("Success:", result);
                navigate(`/`);
            })
            .catch((error) => {
                // Handle errors
                console.error("Error:", error);
            });
    };
    const { width } = useWindowDimensions();
    return (
        <div className="d-flex container mt-2">
            <div
                className={`col-${
                    width > 1270 ? 6 : 12
                } bg-success m-2 text-dark bg-opacity-25 justify-content-cemter`}
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0 0 100px rgba(40, 167, 69, 0.5)",
                    width: "100%",
                }}
            >
                <h2 className="text-center mt-3">
                    {(isLanguage && language.አማ.Car) || "CAR"}{" "}
                    {(type == "rent" &&
                        ((isLanguage && language.አማ.Is_For_Rent) ||
                            "For Rent")) ||
                        (isLanguage && language.አማ.Is_For_Sale) ||
                        "For Sale"}{" "}
                </h2>

                <div className="container mt-2  bg-success p-2 text-success bg-opacity-25 rounded">
                    <small className="mx-5">
                        {" "}
                        {(isLanguage && language.አማ.Asterisk) ||
                            "A red asterisk indicates that this field is required."}{" "}
                    </small>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <h4 className="bg-success p-2 text-white bg-opacity-25 text-center rounded">
                                {(isLanguage && language.አማ.AddressInfo) ||
                                    "Address Information"}
                            </h4>
                            <div className="mb-3">
                                <label
                                    htmlFor="name"
                                    className="form-label required"
                                >
                                    {(isLanguage && language.አማ.Name) || "Name"}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    {(isLanguage && language.አማ.Email) ||
                                        "Email"}
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="phone"
                                    className="form-label  required"
                                >
                                    {(isLanguage && language.አማ.Phone) ||
                                        "Phone"}
                                </label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="phone"
                                    name="phone"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="streetName"
                                    className="form-label"
                                >
                                    {(isLanguage && language.አማ.Street) ||
                                        "Street Name"}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="streetName"
                                    name="Street_name"
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="city"
                                    className="form-label  required"
                                >
                                    {(isLanguage && language.አማ.City) || "City"}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    name="City"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="state"
                                    className="form-label  required"
                                >
                                    {(isLanguage && language.አማ.State) ||
                                        "State/Province"}{" "}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="state"
                                    name="State"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="country"
                                    className="form-label  required"
                                >
                                    {(isLanguage && language.አማ.Country) ||
                                        "Country"}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="country"
                                    name="Country"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="zipCode" className="form-label">
                                    {(isLanguage && language.አማ.Zip) ||
                                        "Zip code"}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="zipCode"
                                    name="Zip_Code"
                                />
                            </div>
                        </div>
                        <h4 className="bg-success p-2 text-white bg-opacity-25 text-center rounded">
                            {(isLanguage && language.አማ.CarInfo) ||
                                "Car Information"}
                        </h4>
                        <div>
                            <div className="mb-3">
                                <label htmlFor="isNew" className="form-label">
                                    {(isLanguage && language.አማ.Is_New) ||
                                        "New"}
                                </label>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="isNew"
                                    name="isNew"
                                />
                            </div>
                            <div className="mb-3 d-flex justify-content-between">
                                <div className="col-6 me-2">
                                    <label
                                        htmlFor="price"
                                        className="form-label  required"
                                    >
                                        {(isLanguage && language.አማ.Price) ||
                                            "Price"}
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="price"
                                        name="price"
                                        required
                                    />
                                </div>
                                <div className="col-6">
                                    <label
                                        htmlFor="currencySelect"
                                        className="form-label  required"
                                    >
                                        {(isLanguage && language.አማ.Currency) ||
                                            "Currency"}
                                    </label>
                                    <select
                                        className="form-control"
                                        id="currencySelect"
                                        name="currency"
                                        onChange={(e) => setSelectedCurrency(e.target.value)}
                                    >
                                        {currencies.map((c, idx) => (
                                            <option key={idx} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="year"
                                    className="form-label  required"
                                >
                                    {(isLanguage && language.አማ.cYear) ||
                                        "Year"}{" "}
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="year"
                                    name="year"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="make"
                                    className="form-label  required"
                                >
                                    {(isLanguage && language.አማ.Make) || "Make"}{" "}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="make"
                                    name="make"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="sitSize" className="form-label">
                                    {(isLanguage && language.አማ.Sit) ||
                                        "Sit Size"}
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="sitSize"
                                    name="sit_size"
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="model"
                                    className="form-label  required"
                                >
                                    {(isLanguage && language.አማ.Model) ||
                                        "Model"}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="model"
                                    name="model"
                                    required
                                />
                            </div>
                            {type == "sale" && (
                                <div className="mb-3">
                                    <label
                                        htmlFor="mileage"
                                        className="form-label"
                                    >
                                        {(isLanguage && language.አማ.Mileage) ||
                                            "Mileage"}
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="mileage"
                                        name="mileage"
                                    />
                                </div>
                            )}
                            {type == "sale" && (
                                <div className="mb-3">
                                    <label
                                        htmlFor="milesPerHour"
                                        className="form-label"
                                    >
                                        {(isLanguage && language.አማ.Miles) ||
                                            "Miles Per Hour"}
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="milesPerHour"
                                        name="miles_per_hour"
                                    />
                                </div>
                            )}
                            {type == "sale" && (
                                <div className="mb-3">
                                    <label
                                        htmlFor="engineType"
                                        className="form-label"
                                    >
                                        {(isLanguage && language.አማ.Engine) ||
                                            "Engine Type"}
                                    </label>
                                    <select
                                        className="form-control"
                                        id="engineType"
                                        name="engineType"
                                    >
                                        <option value="">
                                            {(isLanguage &&
                                                language.አማ.Select) ||
                                                "Select Engine Type"}
                                        </option>
                                        <option value="gasoline">
                                            {(isLanguage &&
                                                language.አማ.Engine) ||
                                                "Engine Type"}{" "}
                                            Gasoline
                                        </option>
                                        <option value="diesel">
                                            {(isLanguage &&
                                                language.አማ.Engine) ||
                                                "Engine Type"}{" "}
                                            Diesel
                                        </option>
                                        <option value="electric">
                                            {(isLanguage &&
                                                language.አማ.Engine) ||
                                                "Engine Type"}{" "}
                                            Electric
                                        </option>
                                        <option value="hybrid">
                                            {(isLanguage &&
                                                language.አማ.Engine) ||
                                                "Engine Type"}{" "}
                                            Hybrid
                                        </option>
                                        <option value="flex-fuel">
                                            {(isLanguage &&
                                                language.አማ.Engine) ||
                                                "Engine Type"}{" "}
                                            Flex-Fuel
                                        </option>
                                        <option value="natural-gas">
                                            {(isLanguage &&
                                                language.አማ.Engine) ||
                                                "Engine Type"}{" "}
                                            Natural Gas
                                        </option>
                                        <option value="hydrogen">
                                            {(isLanguage &&
                                                language.አማ.Engine) ||
                                                "Engine Type"}{" "}
                                            Hydrogen
                                        </option>
                                        <option value="other">
                                            {(isLanguage &&
                                                language.አማ.Other) ||
                                                "Other"}{" "}
                                        </option>
                                    </select>
                                </div>
                            )}

                            <div className="mb-3">
                                <label htmlFor="color" className="form-label">
                                    {(isLanguage && language.አማ.carColor) ||
                                        "Color"}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="color"
                                    name="color"
                                />
                            </div>
                            {type == "sale" && (
                                <div className="mb-3">
                                    <label
                                        htmlFor="fuelType"
                                        className="form-label"
                                    >
                                        {(isLanguage && language.አማ.FuelType) ||
                                            "Fuel Type"}
                                    </label>
                                    <select
                                        className="form-control"
                                        id="fuelType"
                                        name="fuelType"
                                    >
                                        <option value="">
                                            {(isLanguage &&
                                                language.አማ.SelectFuelType) ||
                                                "Select Fuel Type"}
                                        </option>
                                        <option value="gasoline">
                                            {(isLanguage &&
                                                language.አማ.Gasoline) ||
                                                "Gasoline"}
                                        </option>
                                        <option value="diesel">
                                            {(isLanguage &&
                                                language.አማ.Diesel) ||
                                                "Diesel"}
                                        </option>
                                        <option value="electric">
                                            {(isLanguage &&
                                                language.አማ.Electric) ||
                                                "Electric"}
                                        </option>
                                        <option value="hybrid">
                                            {(isLanguage &&
                                                language.አማ.Hybrid) ||
                                                "Hybrid"}
                                        </option>
                                        <option value="flex-fuel">
                                            {(isLanguage &&
                                                language.አማ.flexFuel) ||
                                                "Flex-Fuel"}
                                        </option>
                                        <option value="natural-gas">
                                            {(isLanguage &&
                                                language.አማ.naturalGas) ||
                                                "Natural Gas"}
                                        </option>
                                        <option value="hydrogen">
                                            {(isLanguage &&
                                                language.አማ.Hydrogen) ||
                                                "Hydrogen"}
                                        </option>
                                        <option value="other">
                                            {(isLanguage &&
                                                language.አማ.Other) ||
                                                "Other"}
                                        </option>
                                    </select>
                                </div>
                            )}
                            <div className="mb-3">
                                <label
                                    htmlFor="condition"
                                    className="form-label"
                                >
                                    {(isLanguage && language.አማ.Condition) ||
                                        "Condition"}
                                </label>
                                <select
                                    className="form-control"
                                    id="condition"
                                    name="condition"
                                >
                                    <option value="">
                                        {(isLanguage &&
                                            language.አማ.Select_Condition) ||
                                            "Select Condition"}
                                    </option>
                                    <option value="new">
                                        {(isLanguage && language.አማ.Is_New) ||
                                            "New"}
                                    </option>
                                    <option value="like_new">
                                        {(isLanguage && language.አማ.LikeNew) ||
                                            "Like New"}
                                    </option>
                                    <option value="excellent">
                                        {(isLanguage &&
                                            language.አማ.Excellent) ||
                                            "Excellent"}
                                    </option>
                                    <option value="very_good">
                                        {(isLanguage && language.አማ.veryGood) ||
                                            "Very Good"}
                                    </option>
                                    <option value="good">
                                        {(isLanguage && language.አማ.Good) ||
                                            "Good"}
                                    </option>
                                    <option value="good">
                                        {(isLanguage && language.አማ.Old) ||
                                            "Old"}
                                    </option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="bodyStyle"
                                    className="form-label"
                                >
                                    {(isLanguage && language.አማ.Car) ||
                                        "Body Style"}
                                </label>
                                <select
                                    className="form-select"
                                    id="bodyStyle"
                                    name="body_style"
                                >
                                    <option value="">
                                        {(isLanguage &&
                                            language.አማ.bodyStyle) ||
                                            "Select Body Style"}
                                    </option>
                                    <option value="sedan">
                                        {(isLanguage && language.አማ.Car) ||
                                            "Sedan"}
                                    </option>
                                    <option value="suv">
                                        {(isLanguage && language.አማ.Car) ||
                                            "SUV"}
                                    </option>
                                    <option value="hatchback">
                                        {(isLanguage && language.አማ.Car) ||
                                            "Hatchback"}
                                    </option>
                                    <option value="convertible">
                                        {(isLanguage && language.አማ.Car) ||
                                            "Convertible"}
                                    </option>
                                    <option value="coupe">
                                        {(isLanguage && language.አማ.Coupe) ||
                                            "Coupe"}
                                    </option>
                                    <option value="wagon">
                                        {(isLanguage && language.አማ.Wagon) ||
                                            "Wagon"}
                                    </option>
                                    <option value="van">
                                        {(isLanguage && language.አማ.Van) ||
                                            "Van"}
                                    </option>
                                    <option value="pickup">
                                        {(isLanguage &&
                                            language.አማ.pickupTruck) ||
                                            "Pickup Truck"}
                                    </option>
                                </select>
                            </div>

                            {type == "sale" && (
                                <div className="mb-3">
                                    <label
                                        htmlFor="acceleration"
                                        className="form-label"
                                    >
                                        {(isLanguage &&
                                            language.አማ.Acceleration) ||
                                            "Acceleration"}
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="acceleration"
                                        name="acceleration"
                                    />
                                </div>
                            )}
                            {type == "sale" && (
                                <div className="mb-3">
                                    <label
                                        htmlFor="horsePower"
                                        className="form-label"
                                    >
                                        {(isLanguage &&
                                            language.አማ.horsePower) ||
                                            "Horse Power"}
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="horsePower"
                                        name="horse_power"
                                    />
                                </div>
                            )}
                            {type == "sale" && (
                                <div className="mb-3">
                                    <label
                                        htmlFor="torque"
                                        className="form-label"
                                    >
                                        {(isLanguage && language.አማ.Torque) ||
                                            "Torque"}
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="torque"
                                        name="torque"
                                    />
                                </div>
                            )}
                            <div className="mb-3">
                                <label
                                    htmlFor="interiorColor"
                                    className="form-label"
                                >
                                    {(isLanguage &&
                                        language.አማ.carInteriorColor) ||
                                        "Interior Color"}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="interiorColor"
                                    name="interior_color"
                                />
                            </div>
                            {type == "sale" && (
                                <div className="mb-3">
                                    <label
                                        htmlFor="topSpeed"
                                        className="form-label"
                                    >
                                        {(isLanguage && language.አማ.topSpeed) ||
                                            "Top Speed"}
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="topSpeed"
                                        name="top_speed"
                                    />
                                </div>
                            )}
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="hasSunroof"
                                    name="has_sunroof"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="hasSunroof"
                                >
                                    {(isLanguage && language.አማ.Car) ||
                                        "Has Sunroof"}
                                </label>
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="hasNavigationSystem"
                                    name="has_navigation_system"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="hasNavigationSystem"
                                >
                                    {(isLanguage &&
                                        language.አማ.Has_Navigation_System) ||
                                        "Has Navigation System"}
                                </label>
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="hasBluetooth"
                                    name="has_bluetooth"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="hasBluetooth"
                                >
                                    {(isLanguage &&
                                        language.አማ.Has_Bluetooth) ||
                                        "Has Bluetooth"}
                                </label>
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="hasAudioSystem"
                                    name="has_audio_system"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="hasAudioSystem"
                                >
                                    {(isLanguage &&
                                        language.አማ.Has_Audio_System) ||
                                        "Has Audio System"}
                                </label>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="numberOfAirbags"
                                    className="form-label"
                                >
                                    {(isLanguage && language.አማ.airBags) ||
                                        "Number of Airbags"}
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="numberOfAirbags"
                                    name="number_of_airbags"
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="numberOfDoors"
                                    className="form-label"
                                >
                                    {(isLanguage &&
                                        language.አማ.numberOfDoors) ||
                                        "Number of Doors"}
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="numberOfDoors"
                                    name="number_of_doors"
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="description"
                                    className="form-label"
                                >
                                    {(isLanguage && language.አማ.Description) ||
                                        "Description"}
                                </label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    rows="3"
                                ></textarea>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="images">
                                {(isLanguage && language.አማ.Upload) ||
                                    "Upload Photo"}
                                :{" "}
                            </label>
                            <input
                                type="file"
                                id="images"
                                name="images"
                                accept=".jpg,.jpeg,.png,.webp"
                                multiple
                                // value={images}
                                onChange={(e) => {
                                    const files = Array.from(e.target.files);
                                    setImages(files);
                                }}
                            />
                        </div>
                        <div className="image-preview">
                            {images &&
                                images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="image-box d-flex justify-content-between col-5"
                                    >
                                        {/* <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} /> */}
                                        <span className="ms-2">
                                            {image.name}
                                        </span>
                                        <span
                                            onClick={() => {
                                                setImages((currentImages) =>
                                                    currentImages.filter(
                                                        (image, idx) =>
                                                            idx != index
                                                    )
                                                );
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                className="text-danger"
                                                icon={faTrash}
                                            />
                                        </span>
                                    </div>
                                ))}
                        </div>
                        <button type="submit" className="btn btn-success mx-2">
                            {(isLanguage && language.አማ.Submit) || "Submit"}
                        </button>
                        <Link
                            to={"/"}
                            className="btn bg-warning p-2 bg-opacity-25"
                            role="button"
                        >
                            {isLanguage ? language.አማ.Cancel : "Cancel"}
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};
