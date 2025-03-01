import { Input } from "@/components/ui/input";

import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"



export function InputPrimites({ form, placeholder, type, name, label, isFile, options, onChange, logoImg, setLogoImg, removeImage, radioOptions, isTextarea, isCheckbox }) {
  return (
    <FormField className='  '
      control={form.control}
      name={name}
      render={({ field }) => (        
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            
            {isFile ? (
              <div className="flex items-center gap-3 w-full">
                {/* Image Upload Input */}
                <label
                  htmlFor={name}
                  className="w-2/3 flex items-center justify-center cursor-pointer h-[100px] border border-black border-dotted"
                  >
                  <p>Add Profile Picture</p>
                  <input
                    hidden
                    type="file"
                    id={name}
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      field.onChange(file); // Update React Hook Form with the selected file
                      setLogoImg(URL.createObjectURL(file)); // Set image preview
                      onChange && onChange(e); // If any extra functionality is needed
                    }}
                  />
                </label>

                {/* Preview and Remove Section */}
                <div className="w-1/3 h-[100px] border relative border-black border-dotted">
                  {logoImg && (
                    <>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-0 right-1 text-red-500 h-5 w-5 cursor-pointer"
                      >
                        ✖
                      </button>
                      <img
                        className="w-full h-full object-contain"
                        src={logoImg}
                        alt="Profile"
                      />
                    </>
                  )}
                </div>
              </div>
            ) : options ? (
              <Select {...field} onValueChange={field.onChange}>
                <SelectTrigger className="w-[100%]">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {options.map((option, idx) => (
                      <SelectItem key={idx} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : radioOptions ? (
              <RadioGroup {...field} onValueChange={field.onChange}>
                {radioOptions.map((option, idx) => (
                  <FormItem key={idx}>
                    <FormControl>
                      <RadioGroupItem value={option.value} />
                    </FormControl>
                    <FormLabel>{option.label}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            ) : isTextarea ? (
              <Textarea
                placeholder={placeholder}
                {...field}
                onChange={field.onChange}
              />
            ) : isCheckbox ? (
              <Checkbox type={type} placeholder={placeholder} {...field} checked={field.value}
              onCheckedChange={field.onChange} />
            ) : (
              <Input type={type} placeholder={placeholder} {...field} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}