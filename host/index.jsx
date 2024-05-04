// var fps = 24
// var tick = 10584000000


function Videoclip(videoIndex, Videoclip, tick, cliptick, trimState) {
    var settings = app.project.activeSequence.getSettings();
    var time = new Time();
    app.enableQE();
    //需被切割的视频所在的轨道, getVideoTrackAt(1)对应V2轨道
    var qeTrack = qe.project.getActiveSequence().getVideoTrackAt(videoIndex);
    time.ticks = String(Number(Videoclip.start.ticks) + (Number(cliptick) * tick));
    var timecode = time.getFormatted(settings.videoFrameRate,
        settings.videoDisplayFormat);

    // app.setSDKEventMessage("" + "clipstimecode：" + timecode, "info")
    qeTrack.razor(timecode);
    if (trimState) {
        Videoclip.remove(1, 1)
    } else {
        Videoclip.remove(0, 0)

    }
}
//遍历所有时间轴、轨道、项目
function SelectVideoClips(tick, cliptick, trimState) {
    var success = 0
    var failed = 0
    var sun = 0
    var sequence = app.project.activeSequence;
    for (var trackIndex = 0; trackIndex < sequence.videoTracks.length; trackIndex++) {
        for (var clipIndex = 0; clipIndex < sequence.videoTracks[trackIndex].clips.length; clipIndex++) {
            var clip = sequence.videoTracks[trackIndex].clips[clipIndex];
            if (clip.isSelected() == true) {
                // app.setSDKEventMessage("track[trackIndex]：" + trackIndex + "   " + "clips[clipIndex]：" + clipIndex + "   " + "clip：" + clip, "info")
                sun++;
                if (Number(clip.duration.ticks) - 100 > Number(cliptick) * tick) {
                    Videoclip(trackIndex, clip, tick, cliptick, trimState);
                    success++;

                } else {
                    failed++;
                }

            }


        }
    }
    app.setSDKEventMessage("处理完成\n\n\n\n" + "总处理: " + "总处理: " + sun + " 个\n成功: " + success + " 个\n失败: " + failed + " 个", "info")
    if (failed > 0) {
        app.setSDKEventMessage("有未处理成功的元素\n\n\n\n" + "总处理: " + "\n失败: " + failed + " 个", "warning")
    }
}

function test(number) {
    app.setSDKEventMessage("test：" + number, "info")
}

function showtick() {
    var settings = app.project.activeSequence.getSettings();
    var sequence = app.project.activeSequence;
    for (var trackIndex = 0; trackIndex < sequence.videoTracks.length; trackIndex++) {
        for (var clipIndex = 0; clipIndex < sequence.videoTracks[trackIndex].clips.length; clipIndex++) {
            var clip = sequence.videoTracks[trackIndex].clips[clipIndex];
            if (clip.isSelected() == true) {
                var time = new Time();
                time.ticks = String(Number(clip.start.ticks));
                var timecode = time.getFormatted(settings.videoFrameRate,
                    settings.videoDisplayFormat);
                app.setSDKEventMessage("处理完成\n\n\n\n" + "总处理: " + "时间码: " + timecode + "\nTick: " + time.ticks, "info")
            }
        }
    }
}
