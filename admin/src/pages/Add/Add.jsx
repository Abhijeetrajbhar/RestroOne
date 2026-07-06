import React, { useState } from 'react'
import './Add.css'
import { assets,url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FOOD_CATEGORIES, STATIC_FOOD_TEMPLATES } from '../../assets/staticFoodCatalog';

const Add = () => {

    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });

    const [image, setImage] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const [selectedTemplateId, setSelectedTemplateId] = useState("");

    const visibleTemplates = STATIC_FOOD_TEMPLATES.filter((item) => item.category === data.category);

    const getTemplateFile = async (template) => {
        const response = await fetch(template.image);
        const blob = await response.blob();
        return new File([blob], `${template.id}.png`, { type: blob.type || 'image/png' });
    }

    const selectTemplate = async (template) => {
        try {
            const templateFile = await getTemplateFile(template);
            setImage(templateFile);
            setImagePreview(template.image);
            setSelectedTemplateId(template.id);
            setData({
                name: template.name,
                description: template.description,
                price: template.price,
                category: template.category
            });
        } catch (error) {
            toast.error("Unable to use this dish image");
        }
    }

    const onImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
        setSelectedTemplateId("");
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!image) {
            toast.error("Please upload or choose a dish image");
            return;
        }
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            toast.success(response.data.message)
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            })
            setImage(false);
            setImagePreview("");
            setSelectedTemplateId("");
        }
        else{
            toast.error(response.data.message)
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload image</p>
                    <label htmlFor="image">
                        <img src={!imagePreview ? assets.upload_area : imagePreview} alt="" />
                    </label>
                    <input onChange={onImageUpload} type="file" id="image" accept="image/*" hidden />
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Type here' required />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Product description</p>
                    <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" rows={6} placeholder='Write content here' required />
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Product category</p>
                        <select name='category' onChange={onChangeHandler} value={data.category}>
                            {FOOD_CATEGORIES.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input type="Number" name='price' onChange={onChangeHandler} value={data.price} placeholder='25' />
                    </div>
                </div>
                <div className='add-template-picker flex-col'>
                    <div>
                        <p>Dish assets for {data.category}</p>
                        <span>Choose a ready image or upload your own.</span>
                    </div>
                    <div className='add-template-grid'>
                        {visibleTemplates.map((template) => (
                            <button
                                type='button'
                                key={template.id}
                                className={`add-template-card ${selectedTemplateId === template.id ? 'active' : ''}`}
                                onClick={() => selectTemplate(template)}
                            >
                                <img src={template.image} alt={template.name} />
                                <span>{template.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <button type='submit' className='add-btn' >ADD</button>
            </form>
        </div>
    )
}

export default Add
