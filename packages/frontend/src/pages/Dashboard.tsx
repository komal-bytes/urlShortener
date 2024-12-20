// src/pages/Dashboard.tsx
import React, { useState } from 'react';
import { Input, Button, Dropdown, Tooltip, Select, SelectItem, Spinner } from '@nextui-org/react';
import { FiCopy, FiShare2, FiX, FiCode } from 'react-icons/fi';
import axios from 'axios';
import ShareableURLComponent from '@/components/Dashboard/ShareableURLComponent';
import { sendRequest } from '@/utils/sendRequest';
import { toast } from "react-toastify";

const Dashboard: React.FC = () => {

    const [url, setUrl] = useState('');
    const [customUrl, setCustomUrl] = useState('');
    const [isCustomUrl, setIsCustomUrl] = useState(false);
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [shortening, setShortening] = useState(false);
    const baseUrl = import.meta.env.VITE_API_URL;

    const handleShortenUrl = async () => {
        if (!url) {
            toast.error("Please enter a URL.");
            return;
        }
        setShortening(true)
        try {
            let body = { url };
            if (customUrl) body = { ...body, customUrl: customUrl };
            let data = await sendRequest({ path: "shorten", method: "POST", body })
            console.log(data)
            setShortenedUrl(data.shortUrl);
        } catch (error: any) {
            toast.error(error);
        }
        setShortening(false)
    };


    return (
        <div className="flex flex-col items-center justify-center h-full p-6 w-4/5 md:w-2/3 lg:w-1/2 mx-auto">
            <h1 className="text-3xl font-semibold mb-8">Shorten Your URL</h1>

            <div className="flex flex-col justify-center items-center gap-4 w-full max-w-md">
                <Input
                    fullWidth
                    isRequired={true}
                    placeholder="Enter URL to shorten"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />

                {isCustomUrl ? (
                    <Input
                        fullWidth
                        placeholder="Enter custom URL"
                        isRequired={true}
                        value={customUrl}
                        onChange={(e) => setCustomUrl(e.target.value)}
                        endContent={
                            <FiX
                                className="cursor-pointer"
                                onClick={() => setIsCustomUrl(false)}
                            />
                        }
                    />
                ) : (
                    <Select
                        label="More Options"
                        name="More options"
                        variant='underlined'
                        className='w-[50%] md:w-[30%]'
                        value={isCustomUrl}
                        // selectedKeys={setIsCustomUrl}
                        onChange={setIsCustomUrl}
                    // isInvalid={errors.frequencyType ? true : false}
                    // color={errors.frequencyType ? "danger" : "default"}
                    // errorMessage={errors.frequencyType}
                    >

                        <SelectItem key="1">
                            Custom URL
                        </SelectItem>
                    </Select>
                )}

                {/* {shortenedUrl && (
                    <div className="flex items-center justify-between p-4 bg-white rounded-md shadow-md mt-8 w-full max-w-md">
                        <span>{shortenedUrl}</span>
                        <div className="flex gap-2">
                            <Tooltip content="Copy URL">
                                <FiCopy
                                    className="cursor-pointer"
                                    onClick={() => navigator.clipboard.writeText(shortenedUrl)}
                                />
                            </Tooltip>
                            <Tooltip content="Share URL">
                                <FiShare2 className="cursor-pointer" />
                            </Tooltip>
                            <Tooltip content="Generate QR Code">
                                <FiCode className="cursor-pointer" />
                            </Tooltip>
                        </div>
                    </div>
                )} */}

                <Button color="primary" onClick={handleShortenUrl}>
                    {shortening ? <Spinner size='sm' color='default' /> : "Shorten"}
                </Button>

                {
                    shortenedUrl
                    &&
                    <ShareableURLComponent shortenedUrl={shortenedUrl} />
                }

            </div>


        </div>
    );
};

export default Dashboard;
