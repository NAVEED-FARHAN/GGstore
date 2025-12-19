import { useState } from "react";
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
    HStack,
    IconButton,
    useToast,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Textarea,
    Tag,
    TagLabel,
    TagCloseButton,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import { FaArrowLeft, FaPlus, FaSave } from "react-icons/fa";
import { motion } from "framer-motion";

import { Game } from "../../types";
import APIClient from "../../services/APIClient";

interface AdminAddGameProps {
    onBack: () => void;
    initialData?: Game;
}

const MotionBox = motion(Box);

const AdminAddGame = ({ onBack, initialData }: AdminAddGameProps) => {
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        releaseDate: initialData?.releaseDate || "",
        rating: initialData?.rating || 4.5,
        coverImageUrl: initialData?.coverImageUrl || "",
        bannerImageUrl: initialData?.bannerImageUrl || "",
        trailerUrl: initialData?.trailerUrl || ""
    });

    const [genres, setGenres] = useState<string[]>(initialData?.genres || []);
    const [newGenre, setNewGenre] = useState("");

    const [platforms, setPlatforms] = useState<string[]>(initialData?.platforms || []);
    const [newPlatform, setNewPlatform] = useState("");

    const [screenshots, setScreenshots] = useState<string[]>(initialData?.screenshots || []);
    const [newScreenshot, setNewScreenshot] = useState("");

    const handleAddGenre = () => {
        if (newGenre && !genres.includes(newGenre)) {
            setGenres([...genres, newGenre]);
            setNewGenre("");
        }
    };

    const handleAddPlatform = () => {
        if (newPlatform && !platforms.includes(newPlatform)) {
            setPlatforms([...platforms, newPlatform]);
            setNewPlatform("");
        }
    };

    const handleAddScreenshot = () => {
        if (newScreenshot && !screenshots.includes(newScreenshot)) {
            setScreenshots([...screenshots, newScreenshot]);
            setNewScreenshot("");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const payload = {
            ...formData,
            genres,
            platforms,
            screenshots
        };

        try {
            if (initialData) {
                await APIClient.updateGame({ ...payload, id: initialData.id });
                toast({
                    title: "Success",
                    description: "Game updated successfully!",
                    status: "success",
                    duration: 3000,
                });
            } else {
                await APIClient.addGame(payload);
                toast({
                    title: "Success",
                    description: "Game added successfully!",
                    status: "success",
                    duration: 3000,
                });
            }
            onBack();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save game.",
                status: "error",
                duration: 5000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            p={8}
            minH="100vh"
            bg="gray.900"
            color="white"
        >
            <Container maxW="container.md">
                <HStack mb={8} justify="space-between">
                    <HStack>
                        <IconButton
                            aria-label="Back"
                            icon={<FaArrowLeft />}
                            onClick={onBack}
                            variant="ghost"
                            colorScheme="whiteAlpha"
                        />
                        <Heading size="lg" color="rgb(8, 203, 0)">
                            {initialData ? `Edit ${initialData.title}` : "Add New Game (Admin)"}
                        </Heading>
                    </HStack>
                </HStack>

                <form onSubmit={handleSubmit}>
                    <VStack spacing={6} align="stretch" bg="whiteAlpha.50" p={8} borderRadius="xl" border="1px solid whiteAlpha.200">
                        <FormControl isRequired>
                            <FormLabel>Game Title</FormLabel>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g. Elden Ring"
                                bg="whiteAlpha.100"
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Describe the game..."
                                bg="whiteAlpha.100"
                            />
                        </FormControl>

                        <HStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Release Date</FormLabel>
                                <Input
                                    type="date"
                                    value={formData.releaseDate}
                                    onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                                    bg="whiteAlpha.100"
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Rating (0-5)</FormLabel>
                                <NumberInput
                                    step={0.1}
                                    min={0}
                                    max={5}
                                    value={formData.rating}
                                    onChange={(_, val) => setFormData({ ...formData, rating: val })}
                                >
                                    <NumberInputField bg="whiteAlpha.100" />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                        </HStack>

                        <FormControl>
                            <FormLabel>Genres</FormLabel>
                            <HStack mb={2}>
                                <Input
                                    value={newGenre}
                                    onChange={(e) => setNewGenre(e.target.value)}
                                    placeholder="Add genre..."
                                    bg="whiteAlpha.100"
                                />
                                <IconButton aria-label="Add" icon={<FaPlus />} onClick={handleAddGenre} colorScheme="green" />
                            </HStack>
                            <Wrap spacing={2}>
                                {genres.map(g => (
                                    <WrapItem key={g}>
                                        <Tag variant="solid" colorScheme="green">
                                            <TagLabel>{g}</TagLabel>
                                            <TagCloseButton onClick={() => setGenres(genres.filter(x => x !== g))} />
                                        </Tag>
                                    </WrapItem>
                                ))}
                            </Wrap>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Platforms</FormLabel>
                            <HStack mb={2}>
                                <Input
                                    value={newPlatform}
                                    onChange={(e) => setNewPlatform(e.target.value)}
                                    placeholder="Add platform (PC, PS5...)"
                                    bg="whiteAlpha.100"
                                />
                                <IconButton aria-label="Add" icon={<FaPlus />} onClick={handleAddPlatform} colorScheme="blue" />
                            </HStack>
                            <Wrap spacing={2}>
                                {platforms.map(p => (
                                    <WrapItem key={p}>
                                        <Tag variant="solid" colorScheme="blue">
                                            <TagLabel>{p}</TagLabel>
                                            <TagCloseButton onClick={() => setPlatforms(platforms.filter(x => x !== p))} />
                                        </Tag>
                                    </WrapItem>
                                ))}
                            </Wrap>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Cover Image URL</FormLabel>
                            <Input
                                value={formData.coverImageUrl}
                                onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
                                placeholder="https://..."
                                bg="whiteAlpha.100"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Banner Image URL</FormLabel>
                            <Input
                                value={formData.bannerImageUrl}
                                onChange={(e) => setFormData({ ...formData, bannerImageUrl: e.target.value })}
                                placeholder="https://..."
                                bg="whiteAlpha.100"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Screenshots</FormLabel>
                            <HStack mb={2}>
                                <Input
                                    value={newScreenshot}
                                    onChange={(e) => setNewScreenshot(e.target.value)}
                                    placeholder="Image URL..."
                                    bg="whiteAlpha.100"
                                />
                                <IconButton aria-label="Add" icon={<FaPlus />} onClick={handleAddScreenshot} colorScheme="purple" />
                            </HStack>
                            <Wrap spacing={2}>
                                {screenshots.map((s, idx) => (
                                    <WrapItem key={idx}>
                                        <Tag variant="solid" colorScheme="purple">
                                            <TagLabel>Image {idx + 1}</TagLabel>
                                            <TagCloseButton onClick={() => setScreenshots(screenshots.filter((_, i) => i !== idx))} />
                                        </Tag>
                                    </WrapItem>
                                ))}
                            </Wrap>
                        </FormControl>

                        <Button
                            type="submit"
                            size="lg"
                            leftIcon={<FaSave />}
                            colorScheme="whatsapp"
                            isLoading={isLoading}
                            loadingText="Saving..."
                        >
                            Save Game to Library
                        </Button>
                    </VStack>
                </form>
            </Container>
        </MotionBox>
    );
};

export default AdminAddGame;
