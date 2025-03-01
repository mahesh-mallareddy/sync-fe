"use client"
import { useState, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { addBlogSchema } from '@/schema/admin/addblog';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



const AddBlog = () => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);


    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(addBlogSchema),
    });
    const hiddenFileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);

    // function to handle file input changes
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setPreview(reader.result);
                setValue("image", file); // manually set the image in the form state
            };

            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const removeImage = () => {
        setPreview(null);
        hiddenFileInputRef.current.value = "";
        setValue("image", null);
    };

    const triggerFileInput = () => hiddenFileInputRef.current?.click();

    const onSubmit = (data) => {
        // Log image file data to the console
        console.log(data);

        console.log("Uploaded File:", data.image);

        // For example, if you want to log the file name and size:
        console.log("File Name:", data.image.name);
        console.log("File Size:", data.image.size);
        console.log("File Type:", data.image.type);

        // To display file contents, you can use FileReader (optional):
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log("File Content:", e.target.result); // This will log the file contents (base64 or text)
        };
        reader.readAsDataURL(data.image); // You can use readAsText for text files
    }

    //Custom Tool Bar
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "color"],
            //   "link", "color", "image"],
            [{ "code-block": true }],
            ["clean"],
        ],
    };
    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "indent",
        // "image",
        "code-block",
        "color",
    ];
    return (
        <div className="formpost mx-10 my-15 ">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <Label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</Label>
                    <Input
                        id="title"
                        type="text"
                        {...register('title', { required: true })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                        placeholder="Enter title"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm">{errors.title.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <Label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</Label>
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={(value) => {
                            setContent(value);
                            setValue('content', value); // Set the value in react-hook-form
                        }}
                        modules={modules}
                        formats={formats}
                        className="mt-1 border border-gray-300 rounded-md shadow-sm "

                    />
                    {errors.content && (
                        <p className="text-red-500 text-sm">{errors.content.message}</p>
                    )}
                </div>

                <div className="mb-4 flex flex-col ">
                    <Label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</Label>
                    {!preview && (
                        <Button type="button" onClick={triggerFileInput} 
                        className="w-full bg-white text-black font-semibold py-2 px-4 rounded-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            select Image
                        </Button>
                    )}{preview && <p>image uploaded</p>}
                    <input
                        {...register("image")}
                        ref={hiddenFileInputRef}
                        hidden
                        type="file"
                        onChange={handleFileChange}
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm">{errors.image.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <Label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</Label>
                    <Input
                        id="category"
                        type="text"
                        {...register('category', { required: true })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                        placeholder="Enter category"
                    />
                    {errors.category && (
                        <p className="text-red-500 text-sm">{errors.category.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <Label htmlFor="createdBy" className="block text-sm font-medium text-gray-700">Created By (Role)</Label>
                    <Select
                        id="createdBy"
                        onValueChange={(value) => setValue('createdBy', value)} // Set the value on change
                        defaultValue="" // Optionally set a default value if needed
                        {...register('createdBy', { required: 'Role is required' })} // Registering with React Hook Form
                    >
                        <SelectTrigger className="w-[100%]">
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Select a role</SelectLabel>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="management">Management</SelectItem>
                                <SelectItem value="support">Support</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.createdBy && (
                        <p className="text-red-500 text-sm">{errors.createdBy.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <Label htmlFor="authorName" className="block text-sm font-medium text-gray-700">Author Name</Label>
                    <Input
                        id="authorName"
                        type="text"
                        {...register('authorName', { required: true })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                        placeholder="Enter author name"
                    />
                    {errors.authorName && (
                        <p className="text-red-500 text-sm">{errors.authorName.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <Label htmlFor="publishTime" className="block text-sm font-medium text-gray-700">Publish Time</Label>
                    <Input
                        id="publishTime"
                        type="time"
                        {...register('publishTime', { required: true })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                    />
                    {errors.publishTime && (
                        <p className="text-red-500 text-sm">{errors.publishTime.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <Label htmlFor="publishedDate" className="block text-sm font-medium text-gray-700">Published Date</Label>
                    <Input
                        id="publishedDate"
                        type="date"
                        {...register('publishedDate', { required: true })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                    />
                    {errors.publishedDate && (
                        <p className="text-red-500 text-sm">{errors.publishedDate.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <Label htmlFor="readTime" className="block text-sm font-medium text-gray-700">Read Time (in minutes)</Label>
                    <Input
                        id="readTime"
                        type="number"
                        {...register('readTime', {
                            required: 'Read time is required',
                            setValueAs: (value) => value === '' ? undefined : Number(value) // Convert to number
                        })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                        placeholder="Enter read time"
                    />
                    {errors.readTime && (
                        <p className="text-red-500 text-sm">{errors.readTime.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <Label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</Label>
                    <Select
                        id="status"
                        onValueChange={(value) => setValue('status', value)} // Set the value on change
                        defaultValue="" // Optionally set a default value if needed
                        {...register('status', { required: 'Role is required' })} // Registering with React Hook Form
                    >
                        <SelectTrigger className="w-[100%]">
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Select a role</SelectLabel>
                                <SelectItem value="draft">draft</SelectItem>
                                <SelectItem value="publish">publish</SelectItem>
                                <SelectItem value="unpublish">unpublish</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.status && (
                        <p className="text-red-500 text-sm">{errors.status.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit Form
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddBlog;
