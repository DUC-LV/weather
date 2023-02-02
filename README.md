import PlayerCloseFullScreenIcon from 'assets/icons/player-close-fullscreen.svg';
import PlayerDownIcon from 'assets/icons/player-down.svg';
import PlayerFullScreenIcon from 'assets/icons/player-fullscreen.svg';
import PlayerLikeIcon from 'assets/icons/player-like.svg';
import PlayerNextIcon from 'assets/icons/player-next.svg';
import PlayerPauseIcon from 'assets/icons/player-pause.svg';
import PlayerPlayIcon from 'assets/icons/player-play.svg';
import PlayerPrevIcon from 'assets/icons/player-prev.svg';
import PlayerSettingsIcon from 'assets/icons/player-settings.svg';
import PlayerUpIcon from 'assets/icons/player-up.svg';
import PlayerVolumeIcon from 'assets/icons/player-volume.svg';
import PlayerVolumeOffIcon from 'assets/icons/player-volume-off.svg';
import { ButtonRoundEffect } from 'components';
import { useTranslation } from 'next-i18next';
import Link, { LinkProps } from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Flex } from 'theme-ui';

const ControlBarButton = ({
    SVG,
    name,
    callback,
    align,
    color,
}: {
    SVG: React.FC<React.SVGAttributes<{}>>;
    name: string;
    callback: () => void;
    align?: 'left' | 'right';
    color?: string;
}) => {
    return (
        <ButtonRoundEffect
            title={name}
            variant="wrapper"
            sx={{
                position: 'relative',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                ml: align === 'right' ? '8px' : 0,
                mr: align === 'left' ? '8px' : 0,
                ...(color ? { svg: { path: { fill: color } } } : undefined),
            }}
            onClick={callback}>
            <SVG display="block" width="20px" height="20px" />
        </ButtonRoundEffect>
    );
};

const PlayButton = ({ isPlay, play, pause }: { isPlay: boolean; play: () => void; pause: () => void }) => {
    const { t } = useTranslation('common');
    return (
        <>
            {isPlay ? (
                <ControlBarButton
                    SVG={PlayerPauseIcon}
                    name={t('web__player__button__pause')}
                    callback={pause}
                    align="left"
                />
            ) : (
                <ControlBarButton
                    SVG={PlayerPlayIcon}
                    name={t('web__player__button__play')}
                    callback={play}
                    align="left"
                />
            )}
        </>
    );
};

// eslint-disable-next-line no-empty-pattern
const PrevButton = ({ prevLink, onClick }: { prevLink?: LinkProps; onClick?: () => void }) => {
    const { t } = useTranslation('common');
    if (!prevLink) return null;
    return (
        <Box
            onClick={onClick}
            sx={{
                width: '20px',
                height: '40px',
                mr: '32px',
            }}>
            <Link {...prevLink} passHref>
                <Box as="a" aria-label="prev">
                    <ControlBarButton
                        SVG={PlayerPrevIcon}
                        name={t('web__player__button__prev')}
                        callback={() => null}
                    />
                </Box>
            </Link>
        </Box>
    );
};

// eslint-disable-next-line no-empty-pattern
const NextButton = ({ nextLink, onClick }: { nextLink?: LinkProps; onClick?: () => void }) => {
    const { t } = useTranslation('common');
    if (!nextLink) return null;
    return (
        <Box
            onClick={onClick}
            sx={{
                width: '20px',
                height: '40px',
                mr: '32px',
            }}>
            <Link {...nextLink} passHref>
                <Box as="a" aria-label="next">
                    <ControlBarButton
                        SVG={PlayerNextIcon}
                        name={t('web__player__button__next')}
                        callback={() => null}
                    />
                </Box>
            </Link>
        </Box>
    );
};

const limitNumber = (x: number, a = 0, b = 1) => Math.max(Math.min(x, b), a);

const VOLUME_PROGRESS_LENGTH = 50; // px
const VOLUME_PROGRESS_CUE_SIZE = 12; //px
const VolumeButton = ({
    volume = 1,
    setVolume,
    isMuted,
    setIsMuted,
}: {
    volume: number;
    setVolume: (v: number) => void;
    isMuted: boolean;
    setIsMuted: (muted: boolean) => void;
}) => {
    const { t } = useTranslation('common');
    const [isHover, setIsHover] = useState(false);
    const volumeBarRef = useRef<HTMLDivElement>(null);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const onMouseDown = useCallback(() => {
        setIsMouseDown(true);
    }, [setIsMouseDown]);

    const onMouseUp = useCallback(
        (e: MouseEvent) => {
            if (volumeBarRef.current && volumeBarRef.current.clientWidth) {
                setVolume(
                    limitNumber(
                        (e.clientX - volumeBarRef.current.getBoundingClientRect().left) /
                            volumeBarRef.current.clientWidth
                    )
                );
                setIsMuted(false);
            }
            setIsMouseDown(false);
        },
        [setVolume, setIsMuted]
    );

    const onMouseMove = useCallback(
        (e: MouseEvent) => {
            if (volumeBarRef.current && volumeBarRef.current.clientWidth) {
                setVolume(
                    limitNumber(
                        (e.clientX - volumeBarRef.current.getBoundingClientRect().left) /
                            volumeBarRef.current.clientWidth
                    )
                );
                setIsMuted(false);
            }
        },
        [setIsMuted, setVolume]
    );

    useEffect(() => {
        if (isMouseDown) {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            return () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };
        }
        return;
    }, [isMouseDown, onMouseUp, onMouseMove]);

    const doesShowVolumeSlider = isHover || isMouseDown;

    return (
        <Flex
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            sx={{
                position: 'relative',
                display: 'inline-flex',
                height: '40px',
            }}>
            <Box sx={{ width: '40px', minWidth: '40px', height: '40px' }}>
                <ControlBarButton
                    SVG={isMuted || volume === 0 ? PlayerVolumeOffIcon : PlayerVolumeIcon}
                    name={t('web__player__button__volume')}
                    callback={() => {
                        if (volume <= 0) {
                            setIsMuted(false);
                            setVolume(0.5);
                        } else {
                            setIsMuted(!isMuted);
                        }
                    }}
                />
            </Box>
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'width 400ms, margin 400ms',
                    mr: doesShowVolumeSlider ? 0 : '32px',
                    width: doesShowVolumeSlider ? `${VOLUME_PROGRESS_LENGTH + 32}px` : 0,
                    height: '40px',
                }}>
                <Box
                    ref={volumeBarRef}
                    onMouseDown={onMouseDown}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: '8px',
                        width: `${VOLUME_PROGRESS_LENGTH}px`,
                        height: '40px',
                        cursor: 'pointer',
                    }}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '18px',
                            width: `${VOLUME_PROGRESS_LENGTH}px`,
                            height: '3px',
                            bg: 'whites.6',
                        }}>
                        <Box
                            style={{ width: `${volume * 100}%` }}
                            sx={{
                                position: 'absolute',
                                height: '100%',
                                bg: 'whites.9',
                            }}
                        />
                        <Box
                            style={{ left: `${volume * 100}%` }}
                            sx={{ position: 'absolute', top: 0, pointerEvents: 'none' }}>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: `-${(VOLUME_PROGRESS_CUE_SIZE - 3) / 2}px`,
                                    left: `-${VOLUME_PROGRESS_CUE_SIZE / 2}px`,
                                    borderRadius: '50%',
                                    width: `${VOLUME_PROGRESS_CUE_SIZE}px`,
                                    height: `${VOLUME_PROGRESS_CUE_SIZE}px`,
                                    bg: 'white',
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Flex>
    );
};

const ExpandButton = ({ expanded, setExpanded }: { expanded?: boolean; setExpanded?: (bool: boolean) => void }) => {
    const { t } = useTranslation('common');
    return (
        <>
            {expanded ? (
                <ControlBarButton
                    SVG={PlayerDownIcon}
                    name={t('web__player__button__zoom_out')}
                    callback={() => setExpanded?.(false)}
                />
            ) : (
                <ControlBarButton
                    SVG={PlayerUpIcon}
                    name={t('web__player__button__expand')}
                    callback={() => setExpanded?.(true)}
                />
            )}
        </>
    );
};

// eslint-disable-next-line no-empty-pattern
const LikeButton = ({ isLike, toggleLike }: { isLike?: boolean; toggleLike?: () => void }) => {
    const { t } = useTranslation('common');
    return (
        <ControlBarButton
            color={isLike ? 'primary' : ''}
            SVG={PlayerLikeIcon}
            name={t('web__common__content__button__like')}
            callback={toggleLike ? toggleLike : () => null}
            align="right"
        />
    );
};

const SettingButton = ({
    settingButtonRef,
    isSettingBoardVisible,
    setIsSettingBoardVisible,
}: {
    settingButtonRef: React.RefObject<HTMLDivElement>;
    isSettingBoardVisible: boolean;
    setIsSettingBoardVisible: (x: boolean) => void;
}) => {
    const { t } = useTranslation('common');
    const toggleSetting = useCallback(() => {
        setIsSettingBoardVisible(!isSettingBoardVisible);
    }, [isSettingBoardVisible, setIsSettingBoardVisible]);

    return (
        <Box
            ref={settingButtonRef}
            sx={{
                svg: {
                    transition: 'transform 0.2s linear',
                    transform: isSettingBoardVisible ? 'rotate(30deg)' : 'rotate(0deg)',
                },
            }}>
            <ControlBarButton
                SVG={PlayerSettingsIcon}
                name={t('web__player__button__setting')}
                callback={toggleSetting}
                align="right"
            />
        </Box>
    );
};

const ToggleFullscreenButton = ({
    isFullscreen,
    toggleFullscreen,
}: {
    isFullscreen: boolean;
    toggleFullscreen: () => void;
}) => {
    const { t } = useTranslation('common');
    return (
        <Flex
            sx={{
                svg: { transition: 'transform 0.2s' },
                ':hover': {
                    svg: { transform: !isFullscreen ? 'scale(1.1)' : 'scale(0.9)' },
                },
            }}>
            {isFullscreen ? (
                <ControlBarButton
                    SVG={PlayerCloseFullScreenIcon}
                    name={t('web__player__button__zoom_out')}
                    callback={toggleFullscreen}
                    align="right"
                />
            ) : (
                <ControlBarButton
                    SVG={PlayerFullScreenIcon}
                    name={t('web__player__button__expand')}
                    callback={toggleFullscreen}
                    align="right"
                />
            )}
        </Flex>
    );
};

export {
    PlayButton,
    PrevButton,
    NextButton,
    VolumeButton,
    ExpandButton,
    LikeButton,
    SettingButton,
    ToggleFullscreenButton,
};
